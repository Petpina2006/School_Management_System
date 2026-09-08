<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Alice Johnson',
                'email' => 'alice.admin@example.com',
                'password' => Hash::make('password123'),
                'role' => 'super_admin',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob.manager@example.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // 10 Students (user_id 3 - 12)
            [
                'name' => 'Evan Wright',
                'email' => 'evan.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fiona Gallagher',
                'email' => 'fiona.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'George Clark',
                'email' => 'george.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hannah Miller',
                'email' => 'hannah.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Isaac Lee',
                'email' => 'isaac.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Julia Davis',
                'email' => 'julia.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kevin Moore',
                'email' => 'kevin.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lily Taylor',
                'email' => 'lily.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mason Anderson',
                'email' => 'mason.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nora Thomas',
                'email' => 'nora.student@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // 10 Teachers (user_id 13 - 22)
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Diana Prince',
                'email' => 'diana.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Quinn Harris',
                'email' => 'quinn.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rachel Martin',
                'email' => 'rachel.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samuel Thompson',
                'email' => 'samuel.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tina Garcia',
                'email' => 'tina.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Victor Martinez',
                'email' => 'victor.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wendy Robinson',
                'email' => 'wendy.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Xander Clark',
                'email' => 'xander.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Yvonne Lewis',
                'email' => 'yvonne.teacher@example.com',
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
