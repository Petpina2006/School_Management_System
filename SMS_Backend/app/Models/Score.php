<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $table = "scores";
    protected $fillable = [
        'student_id',
        'subject_id',
        'class_id',
        'teacher_id',
        'exam_type',
        'score',
        'max_score',
        'exam_date',
        'remark'
    ];
}
