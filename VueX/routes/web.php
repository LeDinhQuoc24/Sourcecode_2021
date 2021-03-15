<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/customers', [CustomerController::class,'index']);
Route::post('/customer', [CustomerController::class,'store']);
Route::patch('/editCustomer/{id}', [CustomerController::class,'update']);
Route::get('/editCustomer/{id}', [CustomerController::class,'edit']);
Route::delete('deleteCustomer/{id}', [CustomerController::class,'destroy']);


Route::get('/products', [ProductController::class,'index']);
Route::post('/product', [ProductController::class,'store']);
Route::patch('/editProduct/{id}', [ProductController::class,'update']);
Route::get('/editProduct/{id}', [ProductController::class,'edit']);
Route::delete('deleteProduct/{id}', [ProductController::class,'destroy']);
