<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DTICandidaturaInterna extends Model
{
    use HasFactory;

    protected $table = 'dti_candidaturas_internas';

    protected $fillable = [
        'user_id',
        'nome',
        'email',
        'telefone',
        'cargo_desejado',
        'departamento_atual',
        'motivacao',
        'experiencia',
        'formacao',
        'status',
        'observacoes',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pendente' => 'Pendente',
            'em_analise' => 'Em Análise',
            'aprovada' => 'Aprovada',
            'rejeitada' => 'Rejeitada',
            default => $this->status,
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pendente' => 'yellow',
            'em_analise' => 'blue',
            'aprovada' => 'green',
            'rejeitada' => 'red',
            default => 'gray',
        };
    }
}
