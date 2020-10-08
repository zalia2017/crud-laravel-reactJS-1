<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('/articles', 'ArticleController@index');
// Route::post('/articles/store', 'ArticleController@store');
// Route::get('/article/edit/{id}', 'ArticleController@getArticle');
// Route::get('/article/{id}', 'ArticleController@getArticle');
// Route::put('/article/{id}', 'ArticleController@update');
// Route::delete('/article/delete/{id}', 'ArticleController@delete');

// Route::get('/articles', [ArticleController::class, 'index']);
// Route::post('/articles/store', [ArticleController::class, 'store']);
// Route::get('/article/edit/{id}', [ArticleController::class, 'getArticle']);
// Route::get('/article/{id}', [ArticleController::class, 'getArticle']);
// Route::put('/article/{id}', [ArticleController::class, 'update']);
// Route::delete('/article/delete/{id}', [ArticleController::class, 'delete']);

// Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('/', ArticleController::class)->middleware('auth:api');