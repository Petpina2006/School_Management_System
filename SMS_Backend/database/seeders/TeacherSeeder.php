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
            [
                'user_id' => 3,
                'teacher_code' => 'TCH001',
                'first_name' => 'Charlie',
                'last_name' => 'Brown',
                'gender' => 'male',
                'date_of_birth' => '1985-06-10',
                'phone' => '0812345010',
                'address' => '101 Elm Street',
                'hire_date' => '2019-08-01',
                'specialization' => 'Mathematics',
                'status' => 'active',
            ],
            [
                'user_id' => 4,
                'teacher_code' => 'TCH002',
                'first_name' => 'Diana',
                'last_name' => 'Prince',
                'gender' => 'female',
                'date_of_birth' => '1988-03-25',
                'phone' => '0812345011',
                'address' => '222 Cedar Lane',
                'hire_date' => '2020-09-15',
                'specialization' => 'Science',
                'status' => 'inactive',
            ],
        ];

        foreach ($teachers as $teacher) {
            $teacher['created_at'] = now();
            $teacher['updated_at'] = now();
            DB::table('teachers')->insert($teacher);
        }
    }
}