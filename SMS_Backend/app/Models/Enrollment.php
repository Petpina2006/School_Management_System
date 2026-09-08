<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $table="enrollments";
    protected $fillable = [
        "student_id",
        "class_id",
        "academic_year",
        "enrollment_date",
        "status"
    ];
}
