<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnrollmentSeeder extends Seeder
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

        if ($studentIds->count() < 100) {
            throw new \Exception('Need at least 100 students.');
        }

        if ($classIds->count() < 10) {
            throw new \Exception('Need at least 10 active classes.');
        }

        $enrollments = [];

        for ($i = 0; $i < 100; $i++) {

            $studentId = $studentIds[$i];

            // Assign students to classes
            $classId = $classIds[$i % $classIds->count()];

            // Academic year
            $academicYear = '2026-2027';

            // Enrollment date
            $enrollmentDate = date(
                'Y-m-d',
                strtotime('2026-09-01 +' . ($i % 30) . ' days')
            );

            // Status
            if ($i < 90) {
                $status = 'active';
            } elseif ($i < 97) {
                $status = 'completed';
            } else {
                $status = 'cancelled';
            }

            $enrollments[] = [
                'student_id' => $studentId,
                'class_id' => $classId,
                'academic_year' => $academicYear,
                'enrollment_date' => $enrollmentDate,
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('enrollments')->insert($enrollments);
    }
}