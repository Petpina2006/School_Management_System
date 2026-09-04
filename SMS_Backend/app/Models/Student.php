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
        'address',
        'parent_name',
        'parent_phone',
        'status'
    ];
}
