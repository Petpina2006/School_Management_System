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
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
