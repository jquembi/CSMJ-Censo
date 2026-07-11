<?php

namespace App\Http\Controllers;

use App\Models\CensusCampaign;
use App\Models\CensusLog;
use App\Models\CensusProvinceProgress;
use App\Models\CensusRecord;
use App\Models\Province;
use App\Models\User;
use App\Services\CensusAutoCompletionService;
use App\Services\CensusProvinceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $status = $request->string('status')->toString();
        $query = trim($request->string('q')->toString());

        if ($provinceId) {
            $province = Province::findOrFail($provinceId);
            $this->autoCompletionService->recalculate($campaign, $province);
        }

        $records = CensusRecord::query()
            ->with(['user:id,name,email,numero_agente,cargo,telefone,status,province_id,categoria_profissional,classe,tipo_usuario', 'province:id,nome,sigla'])
            ->where('census_campaign_id', $campaign->id)
            ->when($provinceId, fn ($query) => $query->where('province_id', $provinceId))
            ->when($status !== '', fn ($builder) => $builder->whereHas('user', fn ($userQuery) => $userQuery->where('status', $status)))
            ->when($query !== '', function ($builder) use ($query) {
                $builder->where(function ($inner) use ($query) {
                    $inner->where('agent_number', 'like', "%{$query}%")
                        ->orWhereHas('user', fn ($userQuery) => $userQuery
                            ->where('name', 'like', "%{$query}%")
                            ->orWhere('email', 'like', "%{$query}%")
                            ->orWhere('numero_agente', 'like', "%{$query}%")
                            ->orWhere('cargo', 'like', "%{$query}%"));
                });
            })
            ->orderBy('province_id')
            ->orderBy('agent_number')
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Censo/Registros', [
            'campaign' => $campaign,
            'provinces' => $this->provinceService->provinces(),
            'selectedProvinceId' => $provinceId,
            'selectedStatus' => $status,
            'search' => $query,
            'records' => $records,
            'statusSummary' => [
                'ativos' => CensusRecord::where('census_campaign_id', $campaign->id)->whereHas('user', fn ($query) => $query->whereIn('status', ['ativo', 'activo', 'active']))->count(),
                'inativos' => CensusRecord::where('census_campaign_id', $campaign->id)->whereHas('user', fn ($query) => $query->whereIn('status', ['inativo', 'inactivo', 'inactive', 'suspenso']))->count(),
                'sem_estado' => CensusRecord::where('census_campaign_id', $campaign->id)->whereHas('user', fn ($query) => $query->whereNull('status')->orWhere('status', ''))->count(),
            ],
        ]);
    }

    public function showUser(User $user)
    {
        $campaign = $this->currentCampaign();
        $user->load(['province:id,nome,sigla', 'magistrate', 'justiceOfficer']);
        $record = CensusRecord::query()
            ->with(['province:id,nome,sigla', 'validator:id,name', 'irregularities.resolver:id,name'])
            ->where('census_campaign_id', $campaign->id)
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Censo/UsuarioDetalhe', [
            'campaign' => $campaign,
            'user' => $user,
            'record' => $record,
            'provinces' => $this->provinceService->provinces(),
            'statusOptions' => $this->statusOptions(),
            'censusStatusOptions' => $this->censusStatusOptions(),
            'functionalStatusOptions' => $this->functionalStatusOptions(),
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $campaign = $this->currentCampaign();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'numero_agente' => ['required', 'string', 'max:80'],
            'telefone' => ['nullable', 'string', 'max:80'],
            'cargo' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:80'],
            'province_id' => ['nullable', 'exists:provinces,id'],
            'categoria_profissional' => ['nullable', 'string', 'max:255'],
            'classe' => ['nullable', 'string', 'max:80'],
            'tipo_usuario' => ['nullable', 'string', 'max:80'],
            'career_type' => ['nullable', 'in:magistrate,justice_officer,none'],
            'career_categoria' => ['nullable', 'string', 'max:255'],
            'career_nivel' => ['nullable', 'string', 'max:80'],
            'career_situacao' => ['nullable', 'string', 'max:80'],
            'census_status' => ['nullable', 'string', 'max:80'],
            'functional_status' => ['nullable', 'string', 'max:80'],
            'life_proof_status' => ['boolean'],
            'life_proof_method' => ['nullable', 'string', 'max:80'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        DB::transaction(function () use ($request, $user, $validated, $campaign) {
            $user->fill([
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'numero_agente' => $validated['numero_agente'],
                'telefone' => $validated['telefone'] ?? null,
                'cargo' => $validated['cargo'] ?? null,
                'status' => $validated['status'],
                'province_id' => $validated['province_id'] ?? null,
                'categoria_profissional' => $validated['categoria_profissional'] ?? null,
                'classe' => $validated['classe'] ?? null,
                'tipo_usuario' => $validated['tipo_usuario'] ?? null,
            ])->save();

            $careerType = $validated['career_type'] ?? 'none';
            if ($careerType === 'magistrate') {
                $user->justiceOfficer()->delete();
                $user->magistrate()->updateOrCreate(['user_id' => $user->id], [
                    'categoria' => $validated['career_categoria'] ?? null,
                    'nivel' => $validated['career_nivel'] ?? null,
                    'situacao' => $validated['career_situacao'] ?? $validated['status'],
                ]);
            } elseif ($careerType === 'justice_officer') {
                $user->magistrate()->delete();
                $user->justiceOfficer()->updateOrCreate(['user_id' => $user->id], [
                    'categoria' => $validated['career_categoria'] ?? null,
                    'nivel' => $validated['career_nivel'] ?? null,
                    'situacao' => $validated['career_situacao'] ?? $validated['status'],
                ]);
            } else {
                $user->magistrate()->delete();
                $user->justiceOfficer()->delete();
            }

            if (! $user->province_id) {
                CensusLog::create([
                    'census_campaign_id' => $campaign->id,
                    'user_id' => $request->user()?->id,
                    'action' => 'actualizacao_funcionario_sem_provincia',
                    'ip_address' => $request->ip(),
                    'description' => "Dados do funcionário {$user->numero_agente} actualizados sem registo de censo por falta de província.",
                    'metadata' => ['updated_user_id' => $user->id],
                    'created_at' => now(),
                ]);

                return;
            }

            $record = CensusRecord::firstOrNew([
                'census_campaign_id' => $campaign->id,
                'user_id' => $user->id,
            ]);

            $record->fill([
                'province_id' => $user->province_id,
                'agent_number' => $user->numero_agente,
                'personnel_type' => $this->personnelTypeFor($user->fresh(['magistrate', 'justiceOfficer'])),
                'functional_status' => $validated['functional_status'] ?? $this->functionalStatusFor($user),
                'census_status' => $validated['census_status'] ?? $record->census_status ?? 'em_validacao',
                'life_proof_status' => (bool) ($validated['life_proof_status'] ?? false),
                'life_proof_method' => $validated['life_proof_method'] ?? null,
                'life_proof_date' => ($validated['life_proof_status'] ?? false) ? ($record->life_proof_date ?? now()) : null,
                'validated_by' => $request->user()?->id,
                'validation_date' => now(),
                'notes' => $validated['notes'] ?? null,
                'data_snapshot' => $this->snapshotFor($user->fresh()),
            ]);
            $record->integrity_hash = $record->generateIntegrityHash();
            $record->save();

            CensusLog::create([
                'census_campaign_id' => $campaign->id,
                'user_id' => $request->user()?->id,
                'action' => 'actualizacao_funcionario',
                'ip_address' => $request->ip(),
                'description' => "Dados do funcionário {$user->numero_agente} actualizados no censo.",
                'metadata' => ['updated_user_id' => $user->id, 'record_id' => $record->id],
                'created_at' => now(),
            ]);

            if ($user->province) {
                $this->autoCompletionService->recalculate($campaign, $user->province);
            }
        });

        return redirect()
            ->route('censo.users.show', $user)
            ->with('success', 'Dados do funcionário actualizados com sucesso.');
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
            'inactivo', 'inativo', 'inactive', 'exonerado' => 'inativo',
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

    private function statusOptions(): array
    {
        return [
            ['value' => 'ativo', 'label' => 'Activo'],
            ['value' => 'inativo', 'label' => 'Inactivo'],
            ['value' => 'suspenso', 'label' => 'Suspenso'],
            ['value' => 'licenciado', 'label' => 'Licenciado'],
            ['value' => 'transferido', 'label' => 'Transferido'],
            ['value' => 'reformado', 'label' => 'Reformado/Aposentado'],
            ['value' => 'falecido', 'label' => 'Falecido'],
        ];
    }

    private function censusStatusOptions(): array
    {
        return [
            ['value' => 'nao_iniciado', 'label' => 'Não iniciado'],
            ['value' => 'em_preenchimento', 'label' => 'Em preenchimento'],
            ['value' => 'submetido', 'label' => 'Submetido'],
            ['value' => 'pendente_validacao', 'label' => 'Pendente de validação'],
            ['value' => 'validado', 'label' => 'Validado'],
            ['value' => 'correcao', 'label' => 'Correção solicitada'],
            ['value' => 'rejeitado', 'label' => 'Rejeitado'],
            ['value' => 'nao_localizado', 'label' => 'Não localizado'],
            ['value' => 'irregular', 'label' => 'Indício de irregularidade'],
        ];
    }

    private function functionalStatusOptions(): array
    {
        return [
            ['value' => 'ativo', 'label' => 'Activo'],
            ['value' => 'inativo', 'label' => 'Inactivo'],
            ['value' => 'suspenso', 'label' => 'Suspenso'],
            ['value' => 'licenciado', 'label' => 'Licenciado'],
            ['value' => 'transferido', 'label' => 'Transferido'],
            ['value' => 'reformado_aposentado', 'label' => 'Reformado/Aposentado'],
            ['value' => 'falecido', 'label' => 'Falecido'],
            ['value' => 'pendente_confirmacao', 'label' => 'Pendente de confirmação'],
        ];
    }
}
