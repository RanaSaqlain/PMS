<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
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
    public function show(Project $project)
    {
        return inertia("Project/Show", [
            "project" => new ProjectResource($project)
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
