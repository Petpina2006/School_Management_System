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
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
