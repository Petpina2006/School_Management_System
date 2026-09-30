<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScoreSeeder extends Seeder
{
    public function run(): void
    {
        $studentIds = DB::table('students')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $subjectIds = DB::table('subjects')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $classIds = DB::table('classes')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $teacherIds = DB::table('teachers')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        if ($studentIds->count() < 100) {
            throw new \Exception('Need at least 100 students.');
        }

        if ($subjectIds->count() < 10) {
            throw new \Exception('Need at least 10 active subjects.');
        }

        if ($classIds->count() < 10) {
            throw new \Exception('Need at least 10 active classes.');
        }

        if ($teacherIds->count() < 10) {
            throw new \Exception('Need at least 10 active teachers.');
        }

        $examTypes = [
            'quiz',
            'assignment',
            'midterm',
            'final'
        ];

        $remarks = [
            'Excellent performance',
            'Very good',
            'Good performance',
            'Needs improvement',
            'Satisfactory',
            null,
            null,
            null,
        ];

        $scores = [];

        for ($i = 0; $i < 100; $i++) {

            $studentId = $studentIds[$i];

            $subjectId = $subjectIds[$i % $subjectIds->count()];

            $classId = $classIds[$i % $classIds->count()];

            $teacherId = $teacherIds[($i * 2) % $teacherIds->count()];

            $examType = $examTypes[$i % count($examTypes)];

            // Generate realistic score between 55 and 98
            $score = 55 + (($i * 7) % 44);

            $maxScore = 100;

            $examDate = date(
                'Y-m-d',
                strtotime('2026-09-01 +' . ($i % 30) . ' days')
            );

            if ($score >= 90) {
                $remark = 'Excellent performance';
            } elseif ($score >= 80) {
                $remark = 'Very good';
            } elseif ($score >= 70) {
                $remark = 'Good performance';
            } elseif ($score >= 60) {
                $remark = 'Satisfactory';
            } else {
                $remark = 'Needs improvement';
            }

            $scores[] = [
                'student_id' => $studentId,
                'subject_id' => $subjectId,
                'class_id' => $classId,
                'teacher_id' => $teacherId,
                'exam_type' => $examType,
                'score' => $score,
                'max_score' => $maxScore,
                'exam_date' => $examDate,
                'remark' => $remark,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('scores')->insert($scores);
    }
}