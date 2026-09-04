<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['class_id' => 1, 'subject_id' => 1, 'teacher_id' => 1],
            ['class_id' => 1, 'subject_id' => 2, 'teacher_id' => 1],
            ['class_id' => 2, 'subject_id' => 1, 'teacher_id' => 1],
            ['class_id' => 3, 'subject_id' => 3, 'teacher_id' => 2],
            ['class_id' => 4, 'subject_id' => 4, 'teacher_id' => 2],
        ];

        foreach ($rows as $row) {
            $row['created_at'] = now();
            $row['updated_at'] = now();
            DB::table('class_subjects')->insert($row);
        }
    }
}