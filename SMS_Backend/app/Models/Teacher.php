<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers';
    protected $fillable = [
        'user_id',
        'teacher_code',
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'phone',
        'photo',
        'address',
        'hire_date',
        'specialization',
        'status'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
