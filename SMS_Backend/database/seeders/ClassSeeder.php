<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSeeder extends Seeder
{
    public function run(): void
    {
        $classes = [];

        $grades = [
            'Grade 7',
            'Grade 8',
            'Grade 9',
            'Grade 10',
            'Grade 11',
            'Grade 12',
        ];

        $sections = [
            'A',
            'B',
            'C',
            'D',
        ];

        $rooms = [
            'Room 101',
            'Room 102',
            'Room 103',
            'Room 104',
            'Room 201',
            'Room 202',
            'Room 203',
            'Room 204',
            'Room 301',
            'Room 302',
        ];

        for ($i = 1; $i <= 100; $i++) {

            $grade = $grades[($i - 1) % count($grades)];

            $section = $sections[
                (($i - 1) % count($sections))
            ];

            $room = $rooms[
                (($i - 1) % count($rooms))
            ];

            $classes[] = [
                'class_name' => $grade . ' - ' . $section,

                'grade' => $grade,

                'section' => $section,

                'room' => $room,

                'academic_year' => '2026-2027',

                // Teacher IDs 1 - 100
                'teacher_id' => (($i - 1) % 100) + 1,

                'status' => $i > 95
                    ? 'inactive'
                    : 'active',

                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('classes')->insert($classes);
    }
}