<?php
namespace App\Enums;

namespace App\Enums;

enum CensusStatus: string {
    case PENDING = 'pendente';
    case IN_PROGRESS = 'em_preenchimento';
    case SUBMITTED = 'submetido';
    case VALIDATED = 'validado';
    case CORRECTION_REQUESTED = 'correcao';
    case REJECTED = 'rejeitado';
    case NOT_LOCATED = 'nao_localizado';
    case IRREGULAR = 'irregular';
}
