<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'api'], function(){
    Route::get('tasks', 'App\Http\Controllers\Api\TaskController@index');
    Route::post('tasks/store', 'App\Http\Controllers\Api\TaskController@store'); //保存。
    Route::post('delete', 'App\Http\Controllers\Api\TaskController@delete'); // 削除。
    Route::get('count', 'App\Http\Controllers\Api\TaskController@count');
});
