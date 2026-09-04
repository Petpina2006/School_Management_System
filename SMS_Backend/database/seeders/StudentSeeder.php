<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('students')->insert([
            ['user_id' => 1, 'student_code' => 'STU001', 'gender' => 'Male', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'student_code' => 'STU002', 'gender' => 'Female', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'student_code' => 'STU003', 'gender' => 'Male', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'student_code' => 'STU004', 'gender' => 'Female', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'student_code' => 'STU005', 'gender' => 'Male', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
