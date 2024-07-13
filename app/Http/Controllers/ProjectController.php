<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $projects = Project::query();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if ($request->has('sort_coloumn') &&  $request->has('sort_by')) {
        }
        if ($request->has('name')) {
            $projects->where('name', 'like', '%' . request('name') . '%');
        }
        if ($request->has('status')) {
            $projects->where('status', request('status'));
        }
        $projects = $projects->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        $projectResource = ProjectResource::collection($projects);
        return inertia('Project/Index', [
            'projects' => $projectResource,
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
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $project = Project::with(['tasks', 'createdBy', 'updatedBy'])->findOrFail($id);
        $tasks = Task::where('project_id',$project->id);
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
        return inertia("Project/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => $request->query(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
