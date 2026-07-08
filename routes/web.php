<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DTIController;

Route::inertia('/', 'welcome')->name('home');

// Dashboard
Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard');

// DTI Routes
Route::prefix('dti')->name('dti.')->group(function () {
    Route::get('/dashboard', [DTIController::class, 'dashboard'])->name('dashboard');
    Route::get('/candidatura-interna', [DTIController::class, 'candidaturaInterna'])->name('candidatura-interna');
    Route::post('/candidatura-interna', [DTIController::class, 'storeCandidaturaInterna'])->name('candidatura-interna.store');
    Route::get('/projetos', [DTIController::class, 'projetos'])->name('projetos');
    Route::get('/suporte', [DTIController::class, 'suporte'])->name('suporte');
    Route::get('/relatorios', [DTIController::class, 'relatorios'])->name('relatorios');
});
