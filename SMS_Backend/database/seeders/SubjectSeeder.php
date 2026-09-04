<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'subject_code' => 'SUB001',
                'subject_name' => 'Mathematics',
                'description' => 'Core mathematics course',
            ],
            [
                'subject_code' => 'SUB002',
                'subject_name' => 'Science',
                'description' => 'General science course',
            ],
            [
                'subject_code' => 'SUB003',
                'subject_name' => 'English',
                'description' => 'English language and literature',
            ],
            [
                'subject_code' => 'SUB004',
                'subject_name' => 'History',
                'description' => 'World and national history',
            ],
        ];

        foreach ($subjects as $subject) {
            $subject['status'] = 'active';
            $subject['created_at'] = now();
            $subject['updated_at'] = now();
            DB::table('subjects')->insert($subject);
        }
    }
}