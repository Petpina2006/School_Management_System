<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scores')->insert([
            ['student_id' => 1, 'subject_id' => 1, 'score' => 85.5, 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 2, 'subject_id' => 1, 'score' => 90.0, 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 3, 'subject_id' => 2, 'score' => 78.0, 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 4, 'subject_id' => 3, 'score' => 92.5, 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 5, 'subject_id' => 4, 'score' => 88.0, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
