<?php

namespace App\Models;

use App\Enums\CensusStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CensusRecord extends Model
{
    protected $fillable = [
        'census_campaign_id',
        'user_id',
        'province_id',
        'agent_number',
        'personnel_type',
        'functional_status',
        'census_status',
        'life_proof_status',
        'life_proof_date',
        'life_proof_method',
        'not_located_attempts',
        'not_located_confirmed_at',
        'validated_by',
        'validation_date',
        'notes',
        'data_snapshot',
        'integrity_hash',
    ];

    protected $casts = [
        'census_status' => CensusStatus::class,
        'life_proof_date' => 'datetime',
        'validation_date' => 'datetime',
        'not_located_confirmed_at' => 'datetime',
        'data_snapshot' => 'array',
        'life_proof_status' => 'boolean',
    ];

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

    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    public function irregularities(): HasMany
    {
        return $this->hasMany(CensusIrregularity::class);
    }

    public function hasProfileChangesSinceSubmission(): bool
    {
        if (! $this->data_snapshot) {
            return false;
        }

        return $this->user?->updated_at?->greaterThan($this->updated_at) ?? false;
    }

    public function generateIntegrityHash(): string
    {
        $status = $this->census_status instanceof CensusStatus
            ? $this->census_status->value
            : $this->census_status;

        return hash_hmac('sha256', implode('|', [
            $this->census_campaign_id,
            $this->user_id,
            $this->province_id,
            $this->agent_number,
            $status,
            $this->functional_status,
            (int) $this->life_proof_status,
            optional($this->validation_date)->toISOString(),
        ]), config('app.key'));
    }
}
