<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Count;
use App\Models\Suspension;

class TaskController extends Controller
{
    public function index()
    {
        // Taskテーブルの全レコードを取得。
        $tasks = Task::all();
        // json形式で$tasksを返している。
        return response()->json($tasks, 200);
    }

    public function store(Request $request)
    {
        // Tasksテーブルの新しいレコードをユーザーの入力値から作成している。
        // $requestにTopPage.jsにおけるformDataの各プロパティの値が格納されている。それを取り出して保存している。
        $task = new Task;
        $task->title = $request->title;
        $task->content = $request->content;
        $task->save();
        // 先程作成したレコードを新たに加えて全レコードを取得。
        $tasks = Task::all();
        // json形式で$tasksを返している。
        return response()->json($tasks, 200);
    }

    public function delete(Request $request)
    {
        // 削除するレコードをid（主キー）を使って特定している。
        $task = Task::find($request->id);
        // tasksテーブルで削除する代わりにcountテーブルにそのレコードデータを移している。
        $count = new Count;
        $count->title = $task->title;
        $count->content = $task->content;
        $count->save();
        // countテーブルへのレコード移行が完了したら速やかにtasksテーブルから削除。
        $task->delete();
        // Taskテーブルの全レコードを取得。
        $tasks = Task::all();
        // json形式で$tasksを返している。
        return response()->json($tasks, 200);
    }

    public function count() {
        $count = Count::count();
        return response()->json($count, 200);
    }

    public function suspend(Request $request) {
        // 中断するレコードをid（主キー）を使って特定している。
        $task = Task::find($request->id);
        // tasksテーブルで削除する代わりにsuspensionsテーブルにそのレコードデータを移している。
        $suspension = new Suspension;
        $suspension->title = $task->title;
        $suspension->content = $task->content;
        $suspension->save();
        // suspensionsテーブルへのレコード移行が完了したら速やかにtasksテーブルから削除。
        $task->delete();
        // Taskテーブルの全レコードを取得。
        $tasks = Task::all();
        // json形式で$tasksを返している。
        return response()->json($tasks, 200);
    }

    public function suspension() {
        $suspensions = Suspension::all();
        // json形式で$tasksを返している。
        return response()->json($suspensions, 200);
    }

    public function restore(Request $request) {
        $suspension = Suspension::find($request->id);
        $task = new Task;
        $task->title = $suspension->title;
        $task->content = $suspension->content;
        $task->save();
        $suspension->delete();
        $suspensions = Suspension::all();
        return response()->json($suspensions, 200);
    }

    public function destory(Request $request) {
        $suspension = Suspension::find($request->id);
        $suspension->delete();
        $suspensions = Suspension::all();
        return response()->json($suspensions, 200);
    }

    public function completion() {
        $completions = Count::all();
        return response()->json($completions, 200);
    }

    public function destory2(Request $request) {
        $completion = Count::find($request->id);
        $completion->delete();
        $completions = Count::all();
        return response()->json($completions, 200);
    }

    public function edit(Request $request) {
        $task = Task::find($request->id);
        return response()->json($task, 200);
    }

    public function update(Request $request) {
        $task = Task::find($request->id);
        $task->title = $request->title;
        $task->content = $request->content;
        return $task->save();
        // $tasks = Task::all();
        // return response()->json($tasks, 200);
    }
}
