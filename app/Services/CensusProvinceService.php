<?php

namespace App\Services;

use App\Enums\CensusStatus;
use App\Models\CensusCampaign;
use App\Models\CensusRecord;
use App\Models\Province;
use App\Models\User;
use Illuminate\Support\Collection;

class CensusProvinceService
{
    public function provinces(): Collection
    {
        return Province::query()
            ->orderBy('nome')
            ->get(['id', 'nome', 'sigla']);
    }

    public function syncProvinceRecords(CensusCampaign $campaign, Province $province): int
    {
        $created = 0;

        $users = User::query()
            ->with(['magistrate', 'justiceOfficer'])
            ->where('province_id', $province->id)
            ->whereNotNull('numero_agente')
            ->where('numero_agente', '<>', '')
            ->get();

        foreach ($users as $user) {
            $record = CensusRecord::firstOrNew([
                'census_campaign_id' => $campaign->id,
                'user_id' => $user->id,
            ]);

            if (! $record->exists) {
                $created++;
            }

            $record->fill([
                'province_id' => $province->id,
                'agent_number' => $user->numero_agente,
                'personnel_type' => $this->personnelTypeFor($user),
                'functional_status' => $this->functionalStatusFor($user),
                'census_status' => $record->census_status ?? CensusStatus::NOT_STARTED,
                'data_snapshot' => $record->data_snapshot ?: $this->snapshotFor($user),
            ]);

            $record->integrity_hash = $record->generateIntegrityHash();
            $record->save();
        }

        return $created;
    }

    public function personnelQuery(?int $provinceId = null)
    {
        return User::query()
            ->with(['province', 'magistrate', 'justiceOfficer'])
            ->when($provinceId, fn ($query) => $query->where('province_id', $provinceId))
            ->whereNotNull('numero_agente')
            ->where('numero_agente', '<>', '');
    }

    private function personnelTypeFor(User $user): string
    {
        if ($user->magistrate) {
            return 'magistrado';
        }

        if ($user->justiceOfficer) {
            return 'funcionario_judicial';
        }

        return (string) ($user->tipo_usuario ?: 'nao_classificado');
    }

    private function functionalStatusFor(User $user): string
    {
        $raw = $user->magistrate?->situacao
            ?? $user->justiceOfficer?->situacao
            ?? $user->status
            ?? 'pendente_confirmacao';

        return match ((string) $raw) {
            'activo', 'ativo', 'active' => 'ativo',
            'suspenso' => 'suspenso',
            'licenca', 'licenciado' => 'licenciado',
            'transferido' => 'transferido',
            'aposentado', 'jubilado', 'reformado' => 'reformado_aposentado',
            'falecido' => 'falecido',
            'inactivo', 'inativo', 'exonerado' => 'inativo',
            default => 'pendente_confirmacao',
        };
    }

    private function snapshotFor(User $user): array
    {
        return [
            'name' => $user->name,
            'email' => $user->email,
            'numero_agente' => $user->numero_agente,
            'cargo' => $user->cargo,
            'telefone' => $user->telefone,
            'status' => $user->status,
            'tipo_usuario' => $user->tipo_usuario,
            'categoria_profissional' => $user->categoria_profissional,
            'classe' => $user->classe,
            'province_id' => $user->province_id,
            'court_id' => $user->court_id,
            'department_id' => $user->department_id,
        ];
    }
}
