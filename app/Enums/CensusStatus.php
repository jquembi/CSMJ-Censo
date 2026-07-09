<?php

namespace App\Enums;

enum CensusStatus: string
{
    case NOT_STARTED = 'nao_iniciado';
    case IN_PROGRESS = 'em_preenchimento';
    case SUBMITTED = 'submetido';
    case PENDING_VALIDATION = 'pendente_validacao';
    case VALIDATED = 'validado';
    case CORRECTION_REQUESTED = 'correcao';
    case REJECTED = 'rejeitado';
    case EXPIRED = 'expirado';
    case NOT_LOCATED = 'nao_localizado';
    case IRREGULAR = 'irregular';
    case DECEASED_CONFIRMED = 'falecido_confirmado';
    case RETIRED_CONFIRMED = 'reformado_confirmado';

    public function isCompletionStatus(): bool
    {
        return in_array($this, [
            self::VALIDATED,
            self::NOT_LOCATED,
            self::DECEASED_CONFIRMED,
            self::RETIRED_CONFIRMED,
        ], true);
    }
}
