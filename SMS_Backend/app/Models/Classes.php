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
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function classSubjects()
    {
        return $this->hasMany(ClassSubject::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}
