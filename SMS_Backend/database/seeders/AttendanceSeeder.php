<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $studentIds = DB::table('students')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $classIds = DB::table('classes')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        $teacherIds = DB::table('teachers')
            ->where('status', 'active')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        if ($studentIds->count() < 100) {
            throw new \Exception('Need at least 100 students.');
        }

        if ($classIds->count() < 10) {
            throw new \Exception('Need at least 10 active classes.');
        }

        if ($teacherIds->count() < 10) {
            throw new \Exception('Need at least 10 active teachers.');
        }

        $statuses = [
            'present',
            'present',
            'present',
            'present',
            'late',
            'absent',
            'excused',
        ];

        $attendance = [];

        for ($i = 0; $i < 100; $i++) {

            $studentId = $studentIds[$i];

            $classId = $classIds[$i % $classIds->count()];

            $teacherId = $teacherIds[($i * 2) % $teacherIds->count()];

            // Each student gets a different date
            $attendanceDate = date(
                'Y-m-d',
                strtotime('2026-09-01 +' . $i . ' days')
            );

            $status = $statuses[$i % count($statuses)];

            $remark = null;

            if ($status === 'late') {
                $remark = 'Arrived late';
            } elseif ($status === 'absent') {
                $remark = 'Absent from class';
            } elseif ($status === 'excused') {
                $remark = 'Excused absence';
            }

            $attendance[] = [
                'student_id' => $studentId,
                'class_id' => $classId,
                'teacher_id' => $teacherId,
                'attendance_date' => $attendanceDate,
                'status' => $status,
                'remark' => $remark,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('attendance')->insert($attendance);
    }
}