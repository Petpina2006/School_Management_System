<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $table = 'classes';
    protected $fillable = [
        'class_name',
        'grade',
        'section',
        'room',
        'academic_year',
        'teacher_id'
    ];
}
