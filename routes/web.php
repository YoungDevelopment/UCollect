<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DBRController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dbr/top', [DBRController::class, 'getTopRecords']);

Route::get('/dashboard', function (Request $request) {
    $dbrNo = $request->input('dbr_no', '0000000001');
    return Inertia::render('WorkCard/Dashboard', [
        'initialDbrNo' => $dbrNo
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/search', function () {
    return Inertia::render('WorkCard/Search');
})->middleware(['auth', 'verified'])->name('search');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
