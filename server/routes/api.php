<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| assigned the "api" middleware group. Enjoy building your API!
|--------------------------------------------------------------------------
*/

// Public Routes (No Authentication Required)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Health check (DB + cache + version)
Route::get('/health', function () {
    // DB check
    DB::select('select 1');

    // Cache check
    $cacheKey = 'health_check_ping';
    Cache::put($cacheKey, 'pong', 5);
    $cacheOk = Cache::get($cacheKey) === 'pong';

    // Version (from env or config if set)
    $version = env('APP_VERSION', config('app.version', 'unknown'));

    return response()->json([
        'ok' => true,
        'db' => true,
        'cache' => $cacheOk,
        'version' => $version,
        'time' => now()->toIso8601String(),
    ], 200);
});

// Protected Routes (Require Authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    // Get the authenticated user
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // Client routes
    Route::get('/clients/count', [ClientController::class, 'count']);
    Route::apiResource('clients', ClientController::class);

    // Invoice routes
    Route::get('/invoices/count', [InvoiceController::class, 'count']);
    Route::get('/invoices/pending', [InvoiceController::class, 'pending']);
    Route::get('/invoices/total-revenue', [InvoiceController::class, 'totalRevenue']);

    Route::get('/invoices/status-breakdown', [InvoiceController::class, 'statusBreakdown']);
    Route::get('/invoices/revenue-over-time', [InvoiceController::class, 'revenueOverTime']);
    Route::apiResource('invoices', InvoiceController::class);

    // Logout Route
    Route::post('/logout', [AuthController::class, 'logout']);

});
