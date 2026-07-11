<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CensusProvinceController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->name('login.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::get('/', fn () => auth()->check()
    ? redirect()->route('censo.dashboard')
    : redirect()->route('login')
)->name('home');

Route::middleware('auth')->group(function () {
    Route::redirect('/dashboard', '/censo/dashboard')->name('dashboard');

    Route::prefix('censo')->name('censo.')->group(function () {
        Route::get('/dashboard', [CensusProvinceController::class, 'dashboard'])->name('dashboard');
        Route::get('/registros', [CensusProvinceController::class, 'records'])->name('records');
        Route::get('/usuarios/{user}', [CensusProvinceController::class, 'showUser'])->name('users.show');
        Route::put('/usuarios/{user}', [CensusProvinceController::class, 'updateUser'])->name('users.update');
        Route::post('/campanhas/{campaign}/provincias/{province}/recalcular', [CensusProvinceController::class, 'recalculate'])
            ->name('provinces.recalculate');
    });
});
