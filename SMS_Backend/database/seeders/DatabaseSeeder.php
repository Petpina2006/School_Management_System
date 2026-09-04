<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            UserSeeder::class,
            StudentSeeder::class,
            TeacherSeeder::class,
            ClassSeeder::class,
            SubjectSeeder::class,
            ClassSubjectSeeder::class,
            EnrollmentSeeder::class,
            ScoreSeeder::class,
            AttendanceSeeder::class,
        ]);
    }
}
