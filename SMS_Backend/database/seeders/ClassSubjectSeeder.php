<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSubjectSeeder extends Seeder
{
    public function run(): void
    {
        $classIds = DB::table('classes')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $subjectIds = DB::table('subjects')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $teacherIds = DB::table('teachers')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        if ($classIds->count() < 100) {
            throw new \Exception('Need at least 100 classes.');
        }

        if ($subjectIds->count() < 20) {
            throw new \Exception('Need at least 20 active subjects.');
        }

        if ($teacherIds->count() < 20) {
            throw new \Exception('Need at least 20 active teachers.');
        }

        $classSubjects = [];

        for ($i = 0; $i < 100; $i++) {

            $classId = $classIds[$i];

            // Each class gets different subjects
            $subjectIndex = $i % $subjectIds->count();
            $subjectId = $subjectIds[$subjectIndex];

            // Assign teacher
            $teacherIndex = ($i * 3) % $teacherIds->count();
            $teacherId = $teacherIds[$teacherIndex];

            $classSubjects[] = [
                'class_id' => $classId,
                'subject_id' => $subjectId,
                'teacher_id' => $teacherId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('class_subjects')->insert($classSubjects);
    }
}