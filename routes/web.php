<?php

use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // POS System routes
    Route::get('/pos', [PosController::class, 'index'])->name('pos.index');
    
    // Product management
    Route::resource('products', ProductController::class);
    
    // Sales management
    Route::resource('sales', SaleController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
