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
            [
                'class_name' => 'Grade 7A',
                'grade' => 'Grade 7',
                'section' => 'A',
                'room' => 'Room 101',
                'academic_year' => '2025/2026',
                'teacher_id' => 1,
            ],
            [
                'class_name' => 'Grade 7B',
                'grade' => 'Grade 7',
                'section' => 'B',
                'room' => 'Room 102',
                'academic_year' => '2025/2026',
                'teacher_id' => 2,
            ],
            [
                'class_name' => 'Grade 8A',
                'grade' => 'Grade 8',
                'section' => 'A',
                'room' => 'Room 201',
                'academic_year' => '2025/2026',
                'teacher_id' => 1,
            ],
            [
                'class_name' => 'Grade 8B',
                'grade' => 'Grade 8',
                'section' => 'B',
                'room' => 'Room 202',
                'academic_year' => '2025/2026',
                'teacher_id' => 1,
            ],
        ];

        foreach ($classes as $class) {
            $class['status'] = 'active';
            $class['created_at'] = now();
            $class['updated_at'] = now();
            DB::table('classes')->insert($class);
        }
    }
}