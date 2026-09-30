<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $studentUsers = DB::table('users')
            ->where('role', 'student')
            ->orderBy('id')
            ->pluck('id')
            ->values();

        if ($studentUsers->count() < 100) {
            throw new \Exception(
                'Need at least 100 users with role=student. Found: '
                . $studentUsers->count()
            );
        }

        $firstNames = [
            'Dara',
            'Sokha',
            'Rithy',
            'Piseth',
            'Vannak',
            'Sothea',
            'Vuthy',
            'Chantha',
            'Vireak',
            'Borey',
            'Sopheak',
            'Visal',
            'Makara',
            'Ravin',
            'Kosal',
            'Panha',
            'Ratanak',
            'Davy',
            'Mony',
            'Sovann',
        ];

        $femaleNames = [
            'Sreyneang',
            'Sophea',
            'Malis',
            'Lina',
            'Sreymom',
            'Bopha',
            'Dalin',
            'Chansok',
            'Vicheka',
            'Kunthea',
            'Rachana',
            'Pheaktra',
            'Sreypich',
            'Monika',
            'Sokunthea',
            'Sovannary',
            'Chanmony',
            'Rany',
            'Sokha',
            'Davy',
        ];

        $lastNames = [
            'Sok',
            'Chea',
            'Kim',
            'Chhay',
            'Heng',
            'Mean',
            'Vong',
            'Kong',
            'Lim',
            'Sin',
            'Keo',
            'Phan',
            'Mao',
            'Ouk',
            'Ly',
            'Chan',
            'Sam',
            'Touch',
            'Ros',
            'Pich',
        ];

        $addresses = [
            'Sen Sok, Phnom Penh',
            'Toul Kork, Phnom Penh',
            'Chamkarmon, Phnom Penh',
            'Daun Penh, Phnom Penh',
            'Meanchey, Phnom Penh',
            'Russey Keo, Phnom Penh',
            'Por Senchey, Phnom Penh',
            'Chroy Changvar, Phnom Penh',
            'Kambol, Phnom Penh',
            'Dangkor, Phnom Penh',
        ];

        $parents = [
            'Sok Vanna',
            'Chea Sophal',
            'Kim Sopheak',
            'Heng Dara',
            'Mean Chantha',
            'Vong Sokha',
            'Kong Vuthy',
            'Lim Piseth',
            'Chan Rithy',
            'Mao Sopheak',
        ];

        $students = [];

        for ($i = 0; $i < 100; $i++) {

            $number = $i + 1;

            $gender = $number % 2 === 0
                ? 'female'
                : 'male';

            if ($gender === 'male') {
                $firstName = $firstNames[
                    intdiv($i, 2) % count($firstNames)
                ];
            } else {
                $firstName = $femaleNames[
                    intdiv($i, 2) % count($femaleNames)
                ];
            }

            $lastName = $lastNames[
                $i % count($lastNames)
            ];

            $students[] = [
                'user_id' => $studentUsers[$i],

                'student_code' => 'STU'
                    . str_pad($number, 3, '0', STR_PAD_LEFT),

                'Full_name' => $firstName . ' ' . $lastName,

                'gender' => $gender,

                'date_of_birth' => date(
                    'Y-m-d',
                    strtotime(
                        '2007-01-01 +' . (($i * 37) % 700) . ' days'
                    )
                ),

                'phone' => '012'
                    . str_pad($number, 6, '0', STR_PAD_LEFT),

                'address' => $addresses[
                    $i % count($addresses)
                ],

                'parent_name' => $parents[
                    $i % count($parents)
                ],

                'parent_phone' => '097'
                    . str_pad($number, 6, '0', STR_PAD_LEFT),

                'photo' => null,

                'status' => $number > 95
                    ? 'inactive'
                    : 'active',

                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('students')->insert($students);
    }
}