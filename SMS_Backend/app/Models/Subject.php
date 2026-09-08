<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'subjects';
    protected $fillable = [
        'subject_code',
        'subject_name',
        'description',
        'status'
    ];
    public function classSubjects()
    {
        return $this->hasMany(ClassSubject::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}
