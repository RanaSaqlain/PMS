<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->merge(['show_task' => true]);
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
        $tasks = $tasks->orderBy($sortField, $sortDirection)->with(['project', 'assignedUser', 'createdBy', 'updatedBy'])->paginate(10)->onEachSide(1);
        $taskResource = TaskResource::collection($tasks);
        return inertia('Task/Index', [
            'tasks' => $taskResource,
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tasks = Task::select('id', 'name')->get();
        $users = User::all();
        $projects = Project::all();
        return inertia('Task/Create', [
            'tasks' => $tasks,
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        Task::create($data);
        return to_route('task.index')->with('success', "Task was created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,$id)
    {
        $task = Task::with(['tasks', 'createdBy', 'updatedBy'])->findOrFail($id);
        $tasks = Task::where('task_id', $task->id);
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
        $tasks = $tasks->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Show", [
            "task" => new TaskResource($task),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => $request->query(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::all();
        $projects = Project::all();
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        $data['updated_by'] = auth()->id();
        $task->update($data);
        return to_route('task.index')->with('success', "Task was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return to_route('task.index')->with('success', 'Task was deleted');
    }
}
