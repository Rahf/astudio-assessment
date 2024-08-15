<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TimesheetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user', [UserController::class, 'store']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/user/update', [UserController::class, 'update']);
    Route::post('/user/delete', [UserController::class, 'destroy']);

    Route::post('/project', [ProjectController::class, 'store']);
    Route::get('/project/{id}', [ProjectController::class, 'show']);
    Route::get('/project', [ProjectController::class, 'index']);
    Route::post('/project/update', [ProjectController::class, 'update']);
    Route::post('/project/delete', [ProjectController::class, 'destroy']);

    Route::post('/timesheet', [TimesheetController::class, 'store']);
    Route::get('/timesheet/{id}', [TimesheetController::class, 'show']);
    Route::get('/timesheet', [TimesheetController::class, 'index']);
    Route::post('/timesheet/update', [TimesheetController::class, 'update']);
    Route::post('/timesheet/delete', [TimesheetController::class, 'destroy']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');