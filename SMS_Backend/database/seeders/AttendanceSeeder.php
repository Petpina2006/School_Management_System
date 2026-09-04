<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['student_id' => 1, 'class_id' => 1, 'teacher_id' => 1, 'attendance_date' => '2026-09-01', 'status' => 'present', 'remark' => null],
            ['student_id' => 2, 'class_id' => 1, 'teacher_id' => 1, 'attendance_date' => '2026-09-01', 'status' => 'absent', 'remark' => 'Sick'],
            ['student_id' => 3, 'class_id' => 2, 'teacher_id' => 1, 'attendance_date' => '2026-09-01', 'status' => 'late', 'remark' => null],
            ['student_id' => 1, 'class_id' => 1, 'teacher_id' => 1, 'attendance_date' => '2026-09-02', 'status' => 'present', 'remark' => null],
            ['student_id' => 2, 'class_id' => 1, 'teacher_id' => 1, 'attendance_date' => '2026-09-02', 'status' => 'present', 'remark' => null],
        ];

        foreach ($rows as $row) {
            $row['created_at'] = now();
            $row['updated_at'] = now();
            DB::table('attendance')->insert($row);
        }
    }
}