<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CensusLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'census_campaign_id',
        'user_id',
        'action',
        'ip_address',
        'description',
        'metadata',
        'created_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];
}
