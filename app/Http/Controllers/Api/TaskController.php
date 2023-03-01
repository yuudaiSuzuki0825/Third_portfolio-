<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Count;

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
        $task = new Task;
        $task->title = $request->title;
        $task->content = $request->content;
        $task->save();
        return response()->json($tasks, 200);
    }

    public function delete(Request $request)
    {
        $task = Task::find($request->id);
        $count = new Count;
        $count->title = $task->title;
        $count->content = $task->content;
        $count->save();
        $task->delete();
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }

    public function count() {
        $count = Count::count();
        return response()->json($count, 200);
    }
}
