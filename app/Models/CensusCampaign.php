<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\CampaignStatus;

class CensusCampaign extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'year', 'start_date', 'end_date', 'status', 'description'];

    protected $casts = [
        'status' => CampaignStatus::class,
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function records(): HasMany
    {
        return $this->hasMany(CensusRecord::class);
    }

    public function provinceProgress(): HasMany
    {
        return $this->hasMany(CensusProvinceProgress::class);
    }
}