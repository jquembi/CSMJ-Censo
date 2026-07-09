<?php

namespace App\Services;

use App\Enums\CensusStatus;
use App\Models\CensusCampaign;
use App\Models\CensusLog;
use App\Models\CensusProvinceProgress;
use App\Models\CensusRecord;
use App\Models\Province;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CensusAutoCompletionService
{
    public function __construct(private readonly CensusProvinceService $provinceService)
    {
    }

    public function recalculate(CensusCampaign $campaign, Province $province): CensusProvinceProgress
    {
        return DB::transaction(function () use ($campaign, $province) {
            $this->provinceService->syncProvinceRecords($campaign, $province);

            $totalExpected = User::query()
                ->where('province_id', $province->id)
                ->whereNotNull('numero_agente')
                ->where('numero_agente', '<>', '')
                ->count();

            $records = CensusRecord::query()
                ->where('census_campaign_id', $campaign->id)
                ->where('province_id', $province->id);

            $totalValidated = (clone $records)->whereIn('census_status', $this->completionStatuses())->count();
            $totalNotLocated = (clone $records)->where('census_status', CensusStatus::NOT_LOCATED->value)->count();
            $totalIrregular = (clone $records)->where('census_status', CensusStatus::IRREGULAR->value)->count();
            $totalPending = max($totalExpected - $totalValidated, 0);

            $progress = CensusProvinceProgress::firstOrNew([
                'census_campaign_id' => $campaign->id,
                'province_id' => $province->id,
            ]);

            $status = $this->statusFor($totalExpected, $totalValidated, $totalPending, $totalIrregular);

            $progress->fill([
                'total_expected' => $totalExpected,
                'total_validated' => $totalValidated,
                'total_pending' => $totalPending,
                'total_not_located' => $totalNotLocated,
                'total_irregular' => $totalIrregular,
                'status' => $status,
                'auto_completed_at' => $status === 'concluido_automaticamente'
                    ? ($progress->auto_completed_at ?: now())
                    : null,
            ]);

            $progress->integrity_hash = $progress->generateIntegrityHash();
            $progress->save();

            $this->logVerification($campaign, $province, $progress);

            return $progress;
        });
    }

    public function assertProgressWasNotManuallyForced(CensusProvinceProgress $progress): void
    {
        if ($progress->integrity_hash !== $progress->generateIntegrityHash()) {
            CensusLog::create([
                'census_campaign_id' => $progress->census_campaign_id,
                'action' => 'tentativa_manipulacao',
                'description' => 'Hash de integridade do progresso provincial nao confere.',
                'metadata' => ['province_id' => $progress->province_id],
                'created_at' => now(),
            ]);

            abort(409, 'Integridade do progresso provincial comprometida.');
        }
    }

    private function completionStatuses(): array
    {
        return [
            CensusStatus::VALIDATED->value,
            CensusStatus::NOT_LOCATED->value,
            CensusStatus::DECEASED_CONFIRMED->value,
            CensusStatus::RETIRED_CONFIRMED->value,
        ];
    }

    private function statusFor(int $expected, int $validated, int $pending, int $irregular): string
    {
        if ($expected === 0) {
            return 'nao_iniciado';
        }

        if ($expected === $validated) {
            return 'concluido_automaticamente';
        }

        if ($irregular > 0) {
            return 'em_validacao';
        }

        return $pending === $expected ? 'nao_iniciado' : 'em_execucao';
    }

    private function logVerification(CensusCampaign $campaign, Province $province, CensusProvinceProgress $progress): void
    {
        CensusLog::create([
            'census_campaign_id' => $campaign->id,
            'action' => 'verificacao_automatica_provincia',
            'description' => "Progresso recalculado automaticamente para a provincia {$province->nome}.",
            'metadata' => [
                'province_id' => $province->id,
                'total_expected' => $progress->total_expected,
                'total_validated' => $progress->total_validated,
                'total_pending' => $progress->total_pending,
                'status' => $progress->status,
            ],
            'created_at' => now(),
        ]);
    }
}
