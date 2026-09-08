<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'attendance';
    protected $fillable = [
        'student_id',
        'class_id',
        'teacher_id',
        'attendance_date',
        'status',
        'remark'
    ];
    public function student()
    {
        return $this->belongsTo(Student::class);
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
