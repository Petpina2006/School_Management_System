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
            ['student_id' => 4, 'subject_id' => 2, 'class_id' => 2, 'teacher_id' => 2, 'exam_type' => 'midterm', 'score' => 75.50, 'max_score' => 100, 'exam_date' => '2026-04-12', 'remark' => 'Fair'],
            ['student_id' => 5, 'subject_id' => 3, 'class_id' => 3, 'teacher_id' => 3, 'exam_type' => 'final', 'score' => 95.00, 'max_score' => 100, 'exam_date' => '2026-06-16', 'remark' => 'Excellent'],
            ['student_id' => 6, 'subject_id' => 3, 'class_id' => 3, 'teacher_id' => 3, 'exam_type' => 'midterm', 'score' => 80.00, 'max_score' => 100, 'exam_date' => '2026-04-14', 'remark' => 'Good'],
            ['student_id' => 7, 'subject_id' => 4, 'class_id' => 4, 'teacher_id' => 4, 'exam_type' => 'quiz', 'score' => 82.50, 'max_score' => 100, 'exam_date' => '2026-03-05', 'remark' => 'Good'],
            ['student_id' => 8, 'subject_id' => 4, 'class_id' => 4, 'teacher_id' => 4, 'exam_type' => 'assignment', 'score' => 70.00, 'max_score' => 100, 'exam_date' => '2026-02-25', 'remark' => 'Fair'],
        ];

        foreach ($scores as $score) {
            $score['created_at'] = now();
            $score['updated_at'] = now();
            DB::table('scores')->insert($score);
        }
    }
}
