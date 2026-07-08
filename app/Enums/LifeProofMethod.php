<?php
namespace App\Enums;

enum LifeProofMethod: string {
    case BIOMETRIC = 'biometria';
    case PRESENTIAL = 'presencial';
    case REMOTE = 'remoto_video';
    case DOCUMENTAL = 'validacao_documental';
}