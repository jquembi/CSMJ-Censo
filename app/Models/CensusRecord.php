<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\CensusStatus;

class CensusRecord extends Model
{
    protected $fillable = [
        'census_campaign_id', 
        'user_id', 
        'province_id', 
        'agent_number', 
        'census_status',
        'life_proof_status',
        'life_proof_date',
        'life_proof_method',
        'validated_by',
        'validation_date',
        'notes',
        'data_snapshot' 
    ];

    protected $casts = [
        'census_status' => CensusStatus::class,
        'life_proof_date' => 'datetime',
        'validation_date' => 'datetime',
        'data_snapshot' => 'array',
        'life_proof_status' => 'boolean'
    ];

    // Relacionamento com o Utilizador da Plataforma Geral
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(CensusCampaign::class, 'census_campaign_id');
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    // O validador é um User (geralmente com perfil de RH)
    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    public function irregularities(): HasMany
    {
        return $this->hasMany(CensusIrregularity::class);
    }

    /**
     * Helper para verificar se o snapshot coincide com o perfil atual.
     * Útil para auditoria.
     */
    public function hasProfileChangesSinceSubmission(): bool
    {
        if (!$this->data_snapshot) return false;
        
        $currentProfile = $this->user->profile->toArray();
        // Lógica de comparação...
        return false; 
    }
}