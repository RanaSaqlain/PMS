<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ?? null,
            'name' => $this->name ?? null,
            'description' => $this->description ?? null,
            'image_path' => $this->image_path ?? null,
            'status' => $this->status ?? null,
            'priority' => $this->priority ?? null,
            'assigned_user_id' => new UserResource($this->assignedUser) ?? null,
            'project_id'=> new ProjectResource($this->project)?? null,
            'created_by' => new UserResource($this->createdBy) ?? null,
            'updated_by' => new UserResource($this->updatedBy) ?? null,
            'due_date' => Carbon::parse($this->due_date)->format("Y-m-d") ?? null,
            'created_at' => Carbon::parse($this->created_at)->format("Y-m-d") ?? null,
            'updated_at' => $this->updated_at ?? null,
        ];
    }
}
