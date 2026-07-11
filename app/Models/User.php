<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
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

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'data_admissao' => 'date',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
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
