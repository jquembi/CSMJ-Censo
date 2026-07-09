<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    protected $fillable = [
        'name',
        'email',
        'numero_agente',
        'cargo',
        'telefone',
        'status',
        'province_id',
        'court_id',
        'department_id',
        'categoria_profissional',
        'classe',
        'tipo_usuario',
        'data_admissao',
    ];

    protected $casts = [
        'data_admissao' => 'date',
    ];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function censusRecords(): HasMany
    {
        return $this->hasMany(CensusRecord::class);
    }

    public function magistrate(): HasOne
    {
        return $this->hasOne(Magistrate::class);
    }

    public function justiceOfficer(): HasOne
    {
        return $this->hasOne(JusticeOfficer::class);
    }
}
