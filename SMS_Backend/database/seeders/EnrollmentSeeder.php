<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('enrollments')->insert([
            ['student_id' => 1, 'class_id' => 1, 'enrollment_date' => '2026-01-10', 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 2, 'class_id' => 1, 'enrollment_date' => '2026-01-10', 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 3, 'class_id' => 2, 'enrollment_date' => '2026-01-11', 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 4, 'class_id' => 3, 'enrollment_date' => '2026-01-12', 'created_at' => now(), 'updated_at' => now()],
            ['student_id' => 5, 'class_id' => 4, 'enrollment_date' => '2026-01-13', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
