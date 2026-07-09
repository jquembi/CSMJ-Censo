<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CensusProvinceProgress extends Model
{
    protected $table = 'census_province_progress';

    protected $fillable = [
        'census_campaign_id',
        'province_id',
        'total_expected',
        'total_validated',
        'total_pending',
        'total_not_located',
        'total_irregular',
        'status',
        'auto_completed_at',
        'integrity_hash',
    ];

    protected $casts = [
        'auto_completed_at' => 'datetime',
    ];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(CensusCampaign::class, 'census_campaign_id');
    }

    public function generateIntegrityHash(): string
    {
        return hash_hmac('sha256', implode('|', [
            $this->census_campaign_id,
            $this->province_id,
            $this->total_expected,
            $this->total_validated,
            $this->total_pending,
            $this->total_not_located,
            $this->total_irregular,
            $this->status,
            optional($this->auto_completed_at)->toISOString(),
        ]), config('app.key'));
    }
}
