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
            ['user_id' => 3, 'student_code' => 'STU001', 'Full_name' => 'Evan Wright', 'gender' => 'male', 'date_of_birth' => '2012-04-15', 'phone' => '0812345001', 'address' => '12 Main Street', 'parent_name' => 'Michael Wright', 'parent_phone' => '08123450011', 'status' => 'active'],
            ['user_id' => 4, 'student_code' => 'STU002', 'Full_name' => 'Fiona Gallagher', 'gender' => 'female', 'date_of_birth' => '2011-08-22', 'phone' => '0812345002', 'address' => '45 Oak Avenue', 'parent_name' => 'Peggy Gallagher', 'parent_phone' => '08123450022', 'status' => 'active'],
            ['user_id' => 5, 'student_code' => 'STU003', 'Full_name' => 'George Clark', 'gender' => 'male', 'date_of_birth' => '2012-01-30', 'phone' => '0812345003', 'address' => '78 Maple Drive', 'parent_name' => 'Carol Clark', 'parent_phone' => '08123450033', 'status' => 'active'],
            ['user_id' => 6, 'student_code' => 'STU004', 'Full_name' => 'Hannah Miller', 'gender' => 'female', 'date_of_birth' => '2012-07-11', 'phone' => '0812345004', 'address' => '34 Pine Road', 'parent_name' => 'Robert Miller', 'parent_phone' => '08123450044', 'status' => 'active'],
            ['user_id' => 7, 'student_code' => 'STU005', 'Full_name' => 'Isaac Lee', 'gender' => 'male', 'date_of_birth' => '2011-11-03', 'phone' => '0812345005', 'address' => '56 Birch Lane', 'parent_name' => 'Grace Lee', 'parent_phone' => '08123450055', 'status' => 'active'],
            ['user_id' => 8, 'student_code' => 'STU006', 'Full_name' => 'Julia Davis', 'gender' => 'female', 'date_of_birth' => '2012-09-19', 'phone' => '0812345006', 'address' => '89 Cedar Street', 'parent_name' => 'Daniel Davis', 'parent_phone' => '08123450066', 'status' => 'active'],
            ['user_id' => 9, 'student_code' => 'STU007', 'Full_name' => 'Kevin Moore', 'gender' => 'male', 'date_of_birth' => '2011-12-25', 'phone' => '0812345007', 'address' => '120 Elm Court', 'parent_name' => 'Susan Moore', 'parent_phone' => '08123450077', 'status' => 'active'],
            ['user_id' => 10, 'student_code' => 'STU008', 'Full_name' => 'Lily Taylor', 'gender' => 'female', 'date_of_birth' => '2012-02-14', 'phone' => '0812345008', 'address' => '23 Willow Way', 'parent_name' => 'Jack Taylor', 'parent_phone' => '08123450088', 'status' => 'active'],
            ['user_id' => 11, 'student_code' => 'STU009', 'Full_name' => 'Mason Anderson', 'gender' => 'male', 'date_of_birth' => '2011-06-30', 'phone' => '0812345009', 'address' => '67 Poplar Place', 'parent_name' => 'Karen Anderson', 'parent_phone' => '08123450099', 'status' => 'inactive'],
            ['user_id' => 12, 'student_code' => 'STU010', 'Full_name' => 'Nora Thomas', 'gender' => 'female', 'date_of_birth' => '2012-05-08', 'phone' => '0812345010', 'address' => '14 Spruce Drive', 'parent_name' => 'Henry Thomas', 'parent_phone' => '08123450100', 'status' => 'active'],
        ];

        foreach ($students as $student) {
            $student['created_at'] = now();
            $student['updated_at'] = now();
            DB::table('students')->insert($student);
        }
    }
}
