<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CensusIrregularity extends Model
{
    protected $fillable = [
        'census_record_id',
        'type', 
        'severity',
        'description',
        'is_resolved',
        'resolved_at',
        'resolved_by'
    ];

    public function record(): BelongsTo
    {
        return $this->belongsTo(CensusRecord::class);
    }

    public function resolver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }
}