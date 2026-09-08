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
            ['student_id' => 3, 'class_id' => 2, 'teacher_id' => 2, 'attendance_date' => '2026-09-01', 'status' => 'late', 'remark' => null],
            ['student_id' => 4, 'class_id' => 2, 'teacher_id' => 2, 'attendance_date' => '2026-09-01', 'status' => 'present', 'remark' => null],
            ['student_id' => 5, 'class_id' => 3, 'teacher_id' => 3, 'attendance_date' => '2026-09-02', 'status' => 'present', 'remark' => null],
            ['student_id' => 6, 'class_id' => 3, 'teacher_id' => 3, 'attendance_date' => '2026-09-02', 'status' => 'absent', 'remark' => 'Family event'],
            ['student_id' => 7, 'class_id' => 4, 'teacher_id' => 4, 'attendance_date' => '2026-09-02', 'status' => 'present', 'remark' => null],
            ['student_id' => 8, 'class_id' => 4, 'teacher_id' => 4, 'attendance_date' => '2026-09-02', 'status' => 'late', 'remark' => null],
            ['student_id' => 9, 'class_id' => 5, 'teacher_id' => 5, 'attendance_date' => '2026-09-03', 'status' => 'present', 'remark' => null],
            ['student_id' => 10, 'class_id' => 5, 'teacher_id' => 5, 'attendance_date' => '2026-09-03', 'status' => 'present', 'remark' => null],
        ];

        foreach ($rows as $row) {
            $row['created_at'] = now();
            $row['updated_at'] = now();
            DB::table('attendance')->insert($row);
        }
    }
}
