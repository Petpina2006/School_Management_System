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
            ['subject_code' => 'SUB001', 'subject_name' => 'Mathematics', 'description' => 'Core mathematics course'],
            ['subject_code' => 'SUB002', 'subject_name' => 'Science', 'description' => 'General science course'],
            ['subject_code' => 'SUB003', 'subject_name' => 'English', 'description' => 'English language and literature'],
            ['subject_code' => 'SUB004', 'subject_name' => 'History', 'description' => 'World and national history'],
            ['subject_code' => 'SUB005', 'subject_name' => 'Physics', 'description' => 'Fundamentals of physics'],
            ['subject_code' => 'SUB006', 'subject_name' => 'Chemistry', 'description' => 'Fundamentals of chemistry'],
            ['subject_code' => 'SUB007', 'subject_name' => 'Biology', 'description' => 'Life sciences'],
            ['subject_code' => 'SUB008', 'subject_name' => 'Geography', 'description' => 'Physical and human geography'],
            ['subject_code' => 'SUB009', 'subject_name' => 'Computer Science', 'description' => 'Programming and computer fundamentals'],
            ['subject_code' => 'SUB010', 'subject_name' => 'Physical Education', 'description' => 'Sports and physical fitness'],
        ];

        foreach ($subjects as $subject) {
            $subject['status'] = 'active';
            $subject['created_at'] = now();
            $subject['updated_at'] = now();
            DB::table('subjects')->insert($subject);
        }
    }
}
