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
        $tasks = Task::all();
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
        $task->delete();
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }
}
