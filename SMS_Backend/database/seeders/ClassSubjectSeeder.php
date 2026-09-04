<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('class_subjects')->insert([
            ['class_id' => 1, 'subject_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['class_id' => 1, 'subject_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['class_id' => 2, 'subject_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['class_id' => 3, 'subject_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['class_id' => 4, 'subject_id' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
