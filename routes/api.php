<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DBRController;
use App\Http\Controllers\Dashboard\AccountSearchController;

Route::get('/user', function (Request $request) {
    return $request->user();


})->middleware('auth:sanctum');


Route::get('/dbr/top', [DBRController::class, 'getTopRecords']);
Route::get('/AccountDetails/{dbrNo}', [AccountSearchController::class, 'getAccountDetails']);
Route::get('/DBR_NO_Validator/{dbrNo}', [AccountSearchController::class, 'checkDBR_NO']);
Route::get('/getUDWMenuItems/{UDW_DBR_NO}',[AccountSearchController::class,'getUDWMenuItems']);
Route::get('/getUDWFieldItems/{UDW_SEQ_NO}/{UDW_DBR_NO}',[AccountSearchController::class,'getUDWFieldData']);
