<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            ['user_id' => 13, 'teacher_code' => 'TCH001', 'first_name' => 'Charlie', 'last_name' => 'Brown', 'gender' => 'male', 'date_of_birth' => '1985-06-10', 'phone' => '0812345011', 'address' => '101 Elm Street', 'hire_date' => '2019-08-01', 'specialization' => 'Mathematics', 'status' => 'active'],
            ['user_id' => 14, 'teacher_code' => 'TCH002', 'first_name' => 'Diana', 'last_name' => 'Prince', 'gender' => 'female', 'date_of_birth' => '1988-03-25', 'phone' => '0812345012', 'address' => '222 Cedar Lane', 'hire_date' => '2020-09-15', 'specialization' => 'Science', 'status' => 'inactive'],
            ['user_id' => 15, 'teacher_code' => 'TCH003', 'first_name' => 'Quinn', 'last_name' => 'Harris', 'gender' => 'male', 'date_of_birth' => '1983-11-02', 'phone' => '0812345013', 'address' => '15 Oak Road', 'hire_date' => '2018-07-20', 'specialization' => 'English', 'status' => 'active'],
            ['user_id' => 16, 'teacher_code' => 'TCH004', 'first_name' => 'Rachel', 'last_name' => 'Martin', 'gender' => 'female', 'date_of_birth' => '1990-01-18', 'phone' => '0812345014', 'address' => '88 Maple Court', 'hire_date' => '2021-08-10', 'specialization' => 'History', 'status' => 'active'],
            ['user_id' => 17, 'teacher_code' => 'TCH005', 'first_name' => 'Samuel', 'last_name' => 'Thompson', 'gender' => 'male', 'date_of_birth' => '1986-04-22', 'phone' => '0812345015', 'address' => '3 Birch Drive', 'hire_date' => '2019-01-15', 'specialization' => 'Physics', 'status' => 'active'],
            ['user_id' => 18, 'teacher_code' => 'TCH006', 'first_name' => 'Tina', 'last_name' => 'Garcia', 'gender' => 'female', 'date_of_birth' => '1991-09-05', 'phone' => '0812345016', 'address' => '450 Pine Street', 'hire_date' => '2022-03-01', 'specialization' => 'Chemistry', 'status' => 'active'],
            ['user_id' => 19, 'teacher_code' => 'TCH007', 'first_name' => 'Victor', 'last_name' => 'Martinez', 'gender' => 'male', 'date_of_birth' => '1984-12-12', 'phone' => '0812345017', 'address' => '67 Poplar Avenue', 'hire_date' => '2017-05-25', 'specialization' => 'Biology', 'status' => 'active'],
            ['user_id' => 20, 'teacher_code' => 'TCH008', 'first_name' => 'Wendy', 'last_name' => 'Robinson', 'gender' => 'female', 'date_of_birth' => '1989-02-28', 'phone' => '0812345018', 'address' => '21 Willow Lane', 'hire_date' => '2021-10-05', 'specialization' => 'Geography', 'status' => 'active'],
            ['user_id' => 21, 'teacher_code' => 'TCH009', 'first_name' => 'Xander', 'last_name' => 'Clark', 'gender' => 'male', 'date_of_birth' => '1987-07-17', 'phone' => '0812345019', 'address' => '9 Spruce Place', 'hire_date' => '2018-11-12', 'specialization' => 'Computer Science', 'status' => 'inactive'],
            ['user_id' => 22, 'teacher_code' => 'TCH010', 'first_name' => 'Yvonne', 'last_name' => 'Lewis', 'gender' => 'female', 'date_of_birth' => '1992-03-09', 'phone' => '0812345020', 'address' => '300 Ash Court', 'hire_date' => '2023-01-09', 'specialization' => 'Physical Education', 'status' => 'active'],
        ];

        foreach ($teachers as $teacher) {
            $teacher['created_at'] = now();
            $teacher['updated_at'] = now();
            DB::table('teachers')->insert($teacher);
        }
    }
}
