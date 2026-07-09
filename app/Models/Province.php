<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = ['nome', 'sigla', 'codigo', 'status'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function censusProgress(): HasMany
    {
        return $this->hasMany(CensusProvinceProgress::class);
    }
}
