<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $scores = [
            ['student_id' => 1, 'subject_id' => 1, 'class_id' => 1, 'teacher_id' => 1, 'exam_type' => 'midterm', 'score' => 85.50, 'max_score' => 100, 'exam_date' => '2026-04-10', 'remark' => 'Good'],
            ['student_id' => 1, 'subject_id' => 2, 'class_id' => 1, 'teacher_id' => 1, 'exam_type' => 'final', 'score' => 90.00, 'max_score' => 100, 'exam_date' => '2026-06-15', 'remark' => 'Excellent'],
            ['student_id' => 2, 'subject_id' => 1, 'class_id' => 1, 'teacher_id' => 1, 'exam_type' => 'midterm', 'score' => 78.00, 'max_score' => 100, 'exam_date' => '2026-04-10', 'remark' => 'Fair'],
            ['student_id' => 2, 'subject_id' => 2, 'class_id' => 1, 'teacher_id' => 2, 'exam_type' => 'quiz', 'score' => 92.50, 'max_score' => 100, 'exam_date' => '2026-03-02', 'remark' => 'Excellent'],
            ['student_id' => 3, 'subject_id' => 1, 'class_id' => 2, 'teacher_id' => 1, 'exam_type' => 'assignment', 'score' => 88.00, 'max_score' => 100, 'exam_date' => '2026-02-20', 'remark' => 'Good'],
        ];

        foreach ($scores as $score) {
            $score['created_at'] = now();
            $score['updated_at'] = now();
            DB::table('scores')->insert($score);
        }
    }
}