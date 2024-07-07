<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'status',
        'priority',
        'assigned_user_id',
        'project_id',
        'created_by',
        'updated_by',
        'due_date',
    ];
}
