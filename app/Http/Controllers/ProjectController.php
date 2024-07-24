<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }
        Project::create($data);
        return to_route('project.index')->with('success', "Project was created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $project = Project::with(['tasks', 'createdBy', 'updatedBy'])->findOrFail($id);
        $tasks = Task::where('project_id', $project->id);
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
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }
        $data['updated_by'] = auth()->id();
        $project->update($data);
        return to_route('project.index')->with('success', "Project was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();
        return to_route('project.index')->with('success', 'Project was deleted');
    }
}
