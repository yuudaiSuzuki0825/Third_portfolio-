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
        // $count = Count::count();
        return response()->json($tasks, 200);
    }

    public function store(Request $request)
    {
        $task = new Task;
        $task->title = $request->title;
        $task->content = $request->content;
        $task->save();
        // $count = Count::count();
        return response()->json($tasks, 200);
    }

    public function delete(Request $request)
    {
        $task = Task::find($request->id);
        // $count = new Count;
        // $count->title = $task->title;
        // $count->content = $task->content;
        // $count->save();
        $task->delete();
        $tasks = Task::all();
        // $count = Count::count();
        return response()->json($tasks, 200);
    }
}
