<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enrollments = [
            ['student_id' => 1, 'class_id' => 1, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-10', 'status' => 'active'],
            ['student_id' => 2, 'class_id' => 1, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-10', 'status' => 'active'],
            ['student_id' => 3, 'class_id' => 2, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-11', 'status' => 'active'],
            ['student_id' => 4, 'class_id' => 2, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-11', 'status' => 'active'],
            ['student_id' => 5, 'class_id' => 3, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-12', 'status' => 'active'],
            ['student_id' => 6, 'class_id' => 3, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-12', 'status' => 'active'],
            ['student_id' => 7, 'class_id' => 4, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-13', 'status' => 'active'],
            ['student_id' => 8, 'class_id' => 4, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-13', 'status' => 'active'],
            ['student_id' => 9, 'class_id' => 10, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-14', 'status' => 'completed'],
            ['student_id' => 10, 'class_id' => 10, 'academic_year' => '2025/2026', 'enrollment_date' => '2026-01-14', 'status' => 'active'],
        ];

        foreach ($enrollments as $enrollment) {
            $enrollment['created_at'] = now();
            $enrollment['updated_at'] = now();
            DB::table('enrollments')->insert($enrollment);
        }
    }
}
