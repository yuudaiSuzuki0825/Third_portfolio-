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
    Route::get('tasks', 'App\Http\Controllers\Api\TaskController@index'); // タスク一覧。
    Route::post('tasks/store', 'App\Http\Controllers\Api\TaskController@store'); //保存。
    Route::post('delete', 'App\Http\Controllers\Api\TaskController@delete'); // 削除。
    Route::get('count', 'App\Http\Controllers\Api\TaskController@count'); // 完了数
    Route::post('suspend', 'App\Http\Controllers\Api\TaskController@suspend'); // 中断。
    Route::get('suspensions', 'App\Http\Controllers\Api\TaskController@suspension');
    Route::post('suspensions/restore', 'App\Http\Controllers\Api\TaskController@restore');
    Route::post('suspensions/destory', 'App\Http\Controllers\Api\TaskController@destory');
    Route::get('completions', 'App\Http\Controllers\Api\TaskController@completion');
    Route::post('completions/destory', 'App\Http\Controllers\Api\TaskController@destory2');
    Route::post('edit', 'App\Http\Controllers\Api\TaskController@edit');
    Route::post('update', 'App\Http\Controllers\Api\TaskController@update');
});
