<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('attendances')->insert([
            ['user_id' => 1, 'date' => '2026-09-01', 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'date' => '2026-09-01', 'status' => 'Absent', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'date' => '2026-09-01', 'status' => 'Late', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 1, 'date' => '2026-09-02', 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'date' => '2026-09-02', 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
