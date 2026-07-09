<?php

namespace App\Http\Controllers;

use App\Models\CensusCampaign;
use App\Models\CensusProvinceProgress;
use App\Models\CensusRecord;
use App\Models\Province;
use App\Services\CensusAutoCompletionService;
use App\Services\CensusProvinceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CensusProvinceController extends Controller
{
    public function __construct(
        private readonly CensusProvinceService $provinceService,
        private readonly CensusAutoCompletionService $autoCompletionService,
    ) {
    }

    public function dashboard(Request $request)
    {
        $campaign = $this->currentCampaign();
        $provinceId = $request->integer('province_id') ?: null;

        $provinces = $this->provinceService->provinces();

        foreach ($provinces as $province) {
            $this->autoCompletionService->recalculate($campaign, $province);
        }

        $progress = CensusProvinceProgress::query()
            ->with('province:id,nome,sigla')
            ->where('census_campaign_id', $campaign->id)
            ->when($provinceId, fn ($query) => $query->where('province_id', $provinceId))
            ->orderByDesc('total_irregular')
            ->orderBy('province_id')
            ->get();

        return Inertia::render('Censo/Dashboard', [
            'campaign' => $campaign,
            'provinces' => $provinces,
            'selectedProvinceId' => $provinceId,
            'progress' => $progress,
            'summary' => [
                'total_expected' => $progress->sum('total_expected'),
                'total_validated' => $progress->sum('total_validated'),
                'total_pending' => $progress->sum('total_pending'),
                'total_not_located' => $progress->sum('total_not_located'),
                'total_irregular' => $progress->sum('total_irregular'),
                'completed_provinces' => $progress->where('status', 'concluido_automaticamente')->count(),
                'total_provinces' => $progress->count(),
                'validation_rate' => $this->percentage($progress->sum('total_validated'), $progress->sum('total_expected')),
                'pending_rate' => $this->percentage($progress->sum('total_pending'), $progress->sum('total_expected')),
                'integrity_alerts' => $progress->where('total_irregular', '>', 0)->count(),
            ],
            'riskProvinces' => $progress
                ->filter(fn (CensusProvinceProgress $item) => $item->total_irregular > 0 || $item->total_pending > 0)
                ->sortByDesc(fn (CensusProvinceProgress $item) => $item->total_irregular * 10 + $item->total_pending)
                ->take(5)
                ->values(),
            'reports' => [
                ['name' => 'Progresso do censo por provincia', 'status' => 'Disponivel', 'scope' => 'Provincial'],
                ['name' => 'Taxa de validacao por provincia', 'status' => 'Disponivel', 'scope' => 'Auditoria RH'],
                ['name' => 'Pendencias e prova de vida', 'status' => 'Disponivel', 'scope' => 'Comissao local'],
                ['name' => 'Indicios de irregularidade', 'status' => 'Restrito', 'scope' => 'Controlo interno'],
                ['name' => 'Vagas reais por categoria', 'status' => 'Em consolidacao', 'scope' => 'Concursos internos'],
            ],
        ]);
    }

    public function records(Request $request)
    {
        $campaign = $this->currentCampaign();
        $provinceId = $request->integer('province_id') ?: null;

        if ($provinceId) {
            $province = Province::findOrFail($provinceId);
            $this->autoCompletionService->recalculate($campaign, $province);
        }

        $records = CensusRecord::query()
            ->with(['user:id,name,email,numero_agente,cargo,status,province_id,categoria_profissional,classe,tipo_usuario', 'province:id,nome,sigla'])
            ->where('census_campaign_id', $campaign->id)
            ->when($provinceId, fn ($query) => $query->where('province_id', $provinceId))
            ->orderBy('province_id')
            ->orderBy('agent_number')
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Censo/Registros', [
            'campaign' => $campaign,
            'provinces' => $this->provinceService->provinces(),
            'selectedProvinceId' => $provinceId,
            'records' => $records,
        ]);
    }

    public function recalculate(CensusCampaign $campaign, Province $province)
    {
        $progress = $this->autoCompletionService->recalculate($campaign, $province);
        $this->autoCompletionService->assertProgressWasNotManuallyForced($progress);

        return back()->with('success', 'Progresso provincial recalculado automaticamente.');
    }

    private function currentCampaign(): CensusCampaign
    {
        return CensusCampaign::query()->latest('year')->latest('id')->first()
            ?? CensusCampaign::create([
                'name' => 'Censo e Controlo de Pessoal ' . now()->year,
                'year' => now()->year,
                'start_date' => now()->toDateString(),
                'end_date' => now()->endOfYear()->toDateString(),
                'status' => 'activa',
                'description' => 'Campanha institucional para censo, prova de vida e controlo do quadro de pessoal.',
            ]);
    }

    private function percentage(int $value, int $total): int
    {
        if ($total <= 0) {
            return 0;
        }

        return (int) round(($value / $total) * 100);
    }
}
