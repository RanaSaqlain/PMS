<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = Task::query();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if ($request->has('sort_coloumn') &&  $request->has('sort_by')) {
        }
        if ($request->has('name')) {
            $tasks->where('name', 'like', '%' . request('name') . '%');
        }
        if ($request->has('status')) {
            $tasks->where('status', request('status'));
        }
        $tasks = $tasks->orderBy($sortField, $sortDirection)->with(['project','assignedUser','createdBy','updatedBy'])->paginate(10)->onEachSide(1);
        $taskResource = TaskResource::collection($tasks);
        return inertia('Task/Index', [
            'tasks' => $taskResource,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
