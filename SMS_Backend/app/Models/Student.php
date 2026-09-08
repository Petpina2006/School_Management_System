<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    protected $table = 'students';
    protected $fillable = [
        'user_id',
        'student_code',
        'Full_name',
        'gender',
        'date_of_birth',
        'phone',
        'photo',
        'address',
        'parent_name',
        'parent_phone',
        'status'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
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
