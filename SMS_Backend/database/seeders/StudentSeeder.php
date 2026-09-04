<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'user_id' => 5,
                'student_code' => 'STU001',
                'Full_name' => 'Evan Wright',
                'gender' => 'male',
                'date_of_birth' => '2012-04-15',
                'phone' => '0812345001',
                'address' => '12 Main Street',
                'parent_name' => 'Michael Wright',
                'parent_phone' => '08123450011',
                'status' => 'active',
            ],
            [
                'user_id' => 6,
                'student_code' => 'STU002',
                'Full_name' => 'Fiona Gallagher',
                'gender' => 'female',
                'date_of_birth' => '2011-08-22',
                'phone' => '0812345002',
                'address' => '45 Oak Avenue',
                'parent_name' => 'Peggy Gallagher',
                'parent_phone' => '08123450022',
                'status' => 'active',
            ],
            [
                'user_id' => 7,
                'student_code' => 'STU003',
                'Full_name' => 'George Clark',
                'gender' => 'male',
                'date_of_birth' => '2012-01-30',
                'phone' => '0812345003',
                'address' => '78 Maple Drive',
                'parent_name' => 'Carol Clark',
                'parent_phone' => '08123450033',
                'status' => 'inactive',
            ],
        ];

        foreach ($students as $student) {
            $student['created_at'] = now();
            $student['updated_at'] = now();
            DB::table('students')->insert($student);
        }
    }
}