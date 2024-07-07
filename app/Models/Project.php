<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'image_path',
        'status',
        'created_by',
        'updated_by',
        'due_date',
    ];

    function tasks()  {
        return $this->hasMany(Task::class,'project_id');
    }

    function createdBy() {
        return $this->belongsTo(User::class,'created_by');
    }
    function updatedBy() {
        return $this->belongsTo(User::class,'updated_by');
    }
}
