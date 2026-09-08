<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            ['class_name' => 'Grade 7A', 'grade' => 'Grade 7', 'section' => 'A', 'room' => 'Room 101', 'academic_year' => '2025/2026', 'teacher_id' => 1],
            ['class_name' => 'Grade 7B', 'grade' => 'Grade 7', 'section' => 'B', 'room' => 'Room 102', 'academic_year' => '2025/2026', 'teacher_id' => 2],
            ['class_name' => 'Grade 8A', 'grade' => 'Grade 8', 'section' => 'A', 'room' => 'Room 201', 'academic_year' => '2025/2026', 'teacher_id' => 3],
            ['class_name' => 'Grade 8B', 'grade' => 'Grade 8', 'section' => 'B', 'room' => 'Room 202', 'academic_year' => '2025/2026', 'teacher_id' => 4],
            ['class_name' => 'Grade 9A', 'grade' => 'Grade 9', 'section' => 'A', 'room' => 'Room 301', 'academic_year' => '2025/2026', 'teacher_id' => 5],
            ['class_name' => 'Grade 9B', 'grade' => 'Grade 9', 'section' => 'B', 'room' => 'Room 302', 'academic_year' => '2025/2026', 'teacher_id' => 6],
            ['class_name' => 'Grade 10A', 'grade' => 'Grade 10', 'section' => 'A', 'room' => 'Room 401', 'academic_year' => '2025/2026', 'teacher_id' => 7],
            ['class_name' => 'Grade 10B', 'grade' => 'Grade 10', 'section' => 'B', 'room' => 'Room 402', 'academic_year' => '2025/2026', 'teacher_id' => 8],
            ['class_name' => 'Grade 11A', 'grade' => 'Grade 11', 'section' => 'A', 'room' => 'Room 501', 'academic_year' => '2025/2026', 'teacher_id' => 9],
            ['class_name' => 'Grade 12A', 'grade' => 'Grade 12', 'section' => 'A', 'room' => 'Room 601', 'academic_year' => '2025/2026', 'teacher_id' => 10],
        ];

        foreach ($classes as $class) {
            $class['status'] = 'active';
            $class['created_at'] = now();
            $class['updated_at'] = now();
            DB::table('classes')->insert($class);
        }
    }
}
