<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Magistrate extends Model
{
    protected $fillable = ['user_id', 'categoria', 'nivel', 'situacao'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
