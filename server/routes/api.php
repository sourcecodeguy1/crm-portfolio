<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Protected Routes (Require Authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    // Get the authenticated user
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // Clients API (CRUD)
    Route::apiResource('clients', ClientController::class);

    // Invoices API (CRUD)
    Route::apiResource('invoices', InvoiceController::class);

    // Logout Route
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/clients/count', [ClientController::class, 'count']);
    Route::get('/invoices/count', [InvoiceController::class, 'count']);
    Route::get('/invoices/pending', [InvoiceController::class, 'pending']);
    Route::get('/invoices/total-revenue', [InvoiceController::class, 'totalRevenue']);

});
