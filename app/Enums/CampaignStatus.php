<?php
namespace App\Enums;

enum CampaignStatus: string {
    case DRAFT = 'rascunho';
    case ACTIVE = 'activa';
    case VALIDATING = 'em_validacao';
    case CLOSED = 'encerrada';
}