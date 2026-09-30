<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $maleFirstNames = [
            'Dara',
            'Vuthy',
            'Sokha',
            'Rithy',
            'Piseth',
            'Vannak',
            'Sothea',
            'Borey',
            'Visal',
            'Panha',
            'Ratanak',
            'Makara',
            'Kosal',
            'Vireak',
            'Chantha',
            'Sovann',
            'Ravy',
            'Samnang',
            'Veasna',
            'Davin',
        ];

        $femaleFirstNames = [
            'Sophea',
            'Sreyneang',
            'Malis',
            'Dalin',
            'Bopha',
            'Vicheka',
            'Kunthea',
            'Rachana',
            'Sreypich',
            'Sokunthea',
            'Monika',
            'Sovannary',
            'Chanmony',
            'Pheaktra',
            'Lina',
            'Davy',
            'Rany',
            'Sreymom',
            'Kanika',
            'Chansok',
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

        $specializations = [
            'Mathematics',
            'English',
            'Computer Science',
            'Physics',
            'Chemistry',
            'Biology',
            'Khmer Literature',
            'History',
            'Geography',
            'Information Technology',
            'Web Development',
            'Database Management',
            'Programming',
            'Networking',
            'Business Studies',
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

        $teachers = [];

        for ($i = 1; $i <= 100; $i++) {

            $gender = $i % 2 === 0 ? 'female' : 'male';

            if ($gender === 'male') {
                $firstName = $maleFirstNames[
                    (($i - 1) / 2) % count($maleFirstNames)
                ];
            } else {
                $firstName = $femaleFirstNames[
                    (($i - 1) / 2) % count($femaleFirstNames)
                ];
            }

            $lastName = $lastNames[
                ($i - 1) % count($lastNames)
            ];

            $teachers[] = [
                'user_id' => $i + 105,

                'teacher_code' => 'TCH' . str_pad(
                    $i,
                    3,
                    '0',
                    STR_PAD_LEFT
                ),

                'first_name' => $firstName,

                'last_name' => $lastName,

                'gender' => $gender,

                'date_of_birth' => date(
                    'Y-m-d',
                    strtotime(
                        '1980-01-01 +' .
                        (($i * 83) % 6500) .
                        ' days'
                    )
                ),

                'phone' => '011' . str_pad(
                    $i,
                    6,
                    '0',
                    STR_PAD_LEFT
                ),

                'address' => $addresses[
                    ($i - 1) % count($addresses)
                ],

                'hire_date' => date(
                    'Y-m-d',
                    strtotime(
                        '2015-01-01 +' .
                        (($i * 47) % 4000) .
                        ' days'
                    )
                ),

                'specialization' => $specializations[
                    ($i - 1) % count($specializations)
                ],

                'photo' => null,

                'status' => $i > 95
                    ? 'inactive'
                    : 'active',

                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('teachers')->insert($teachers);
    }
}