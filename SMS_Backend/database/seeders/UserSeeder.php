<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password123');

        $users = [

            // =========================
            // SUPER ADMIN
            // =========================
            [
                'name' => 'Sok Dara',
                'email' => 'sok.dara@talutun.edu.kh',
                'password' => $password,
                'role' => 'super_admin',
                'status' => 'active',
            ],

            // =========================
            // ADMINS - 5
            // =========================
            [
                'name' => 'Chantha Sok',
                'email' => 'chantha.sok@talutun.edu.kh',
                'password' => $password,
                'role' => 'admin',
                'status' => 'active',
            ],
            [
                'name' => 'Vanna Chea',
                'email' => 'vanna.chea@talutun.edu.kh',
                'password' => $password,
                'role' => 'admin',
                'status' => 'active',
            ],
            [
                'name' => 'Rithy Heng',
                'email' => 'rithy.heng@talutun.edu.kh',
                'password' => $password,
                'role' => 'admin',
                'status' => 'active',
            ],
            [
                'name' => 'Sreymom Ly',
                'email' => 'sreymom.ly@talutun.edu.kh',
                'password' => $password,
                'role' => 'admin',
                'status' => 'inactive',
            ],
            [
                'name' => 'Bunthoeun Chea',
                'email' => 'bunthoeun.chea@talutun.edu.kh',
                'password' => $password,
                'role' => 'admin',
                'status' => 'active',
            ],

            // =========================
            // STUDENTS - FIRST 50
            // =========================
            [
                'name' => 'Sokha Chan',
                'email' => 'sokha.chan@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Dara Kim',
                'email' => 'dara.kim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Vicheka Lim',
                'email' => 'vicheka.lim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sokunthea Mey',
                'email' => 'sokunthea.mey@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Borey Heng',
                'email' => 'borey.heng@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Rachana Chea',
                'email' => 'rachana.chea@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Pisey Sok',
                'email' => 'pisey.sok@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Makara Phan',
                'email' => 'makara.phan@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sophea Kong',
                'email' => 'sophea.kong@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Davy Ros',
                'email' => 'davy.ros@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'inactive',
            ],
            [
                'name' => 'Kanha Touch',
                'email' => 'kanha.touch@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sovannara Keo',
                'email' => 'sovannara.keo@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Nita Prak',
                'email' => 'nita.prak@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Ravy Nou',
                'email' => 'ravy.nou@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sokchea Tep',
                'email' => 'sokchea.tep@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Pheakdey Em',
                'email' => 'pheakdey.em@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Chanserey Pech',
                'email' => 'chanserey.pech@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sreyneang Yim',
                'email' => 'sreyneang.yim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Rothanak Chey',
                'email' => 'rothanak.chey@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Mony Vong',
                'email' => 'mony.vong@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'inactive',
            ],
            [
                'name' => 'Sokleng Mao',
                'email' => 'sokleng.mao@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Dalin Huot',
                'email' => 'dalin.huot@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Veasna Chhim',
                'email' => 'veasna.chhim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sokny Choun',
                'email' => 'sokny.choun@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Chanrith Nhem',
                'email' => 'chanrith.nhem@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Rina Kheang',
                'email' => 'rina.kheang@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Dara Vuth',
                'email' => 'dara.vuth@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Bunthoeun Prum',
                'email' => 'bunthoeun.prum@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sreypich Ouk',
                'email' => 'sreypich.ouk@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'inactive',
            ],
            [
                'name' => 'Sovanreach Yin',
                'email' => 'sovanreach.yin@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Chenda Long',
                'email' => 'chenda.long@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Rithy Sok',
                'email' => 'rithy.sok@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sokha Pen',
                'email' => 'sokha.pen@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Kosal Kim',
                'email' => 'kosal.kim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Vanna Ly',
                'email' => 'vanna.ly@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Srey Mom Heng',
                'email' => 'sreymom.heng@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Borey Sok',
                'email' => 'borey.sok@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sopheap Chhay',
                'email' => 'sopheap.chhay@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Pheaktra Lim',
                'email' => 'pheaktra.lim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'inactive',
            ],
            [
                'name' => 'Sreyneang Kong',
                'email' => 'sreyneang.kong@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Ratha Mean',
                'email' => 'ratha.mean@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Davin Chea',
                'email' => 'davin.chea@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Kunthea Sim',
                'email' => 'kunthea.sim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sothea Chan',
                'email' => 'sothea.chan@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Malis Neang',
                'email' => 'malis.neang@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Rin Soth',
                'email' => 'rin.soth@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Vibol Kong',
                'email' => 'vibol.kong@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Sovann Kim',
                'email' => 'sovann.kim@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'inactive',
            ],
            [
                'name' => 'Rany Chum',
                'email' => 'rany.chum@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Pina Pet',
                'email' => 'pina.pet@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => 'active',
            ],

            // =========================
            // STUDENTS - ADD 50
            // =========================
        ];

        // Add students 51 - 100
        for ($i = 51; $i <= 100; $i++) {
            $users[] = [
                'name' => 'Student ' . $i,
                'email' => 'student' . $i . '@student.talutun.edu.kh',
                'password' => $password,
                'role' => 'student',
                'status' => $i % 10 === 0 ? 'inactive' : 'active',
            ];
        }

        // =========================
        // TEACHERS - EXISTING 45
        // =========================

        $teachers = [
            'Charlie Brown',
            'Diana Prince',
            'Quinn Harris',
            'Rachel Martin',
            'Samuel Thompson',
            'Tina Garcia',
            'Victor Martinez',
            'Wendy Robinson',
            'Xander Clark',
            'Yvonne Lewis',
            'Andrew Walker',
            'Bella Hall',
            'Christopher Allen',
            'Deborah Young',
            'Edward King',
            'Florence Scott',
            'Gabriel Green',
            'Helen Baker',
            'Ian Adams',
            'Jessica Nelson',
            'Kevin Carter',
            'Laura Mitchell',
            'Michael Perez',
            'Nancy Roberts',
            'Oscar Turner',
            'Patricia Phillips',
            'Robert Campbell',
            'Sarah Parker',
            'Thomas Evans',
            'Uma Edwards',
            'William Collins',
            'Violet Stewart',
            'Alexander Morris',
            'Bianca Rogers',
            'Charles Reed',
            'Daisy Cook',
            'Daniel Morgan',
            'Eva Bell',
            'Frederick Murphy',
            'Gina Bailey',
            'Harry Rivera',
            'Irene Cooper',
            'Jack Richardson',
            'Karen Cox',
            'Leo Howard',
        ];

        foreach ($teachers as $index => $teacherName) {
            $number = $index + 1;

            $users[] = [
                'name' => $teacherName,
                'email' => 'teacher' . $number . '@talutun.edu.kh',
                'password' => $password,
                'role' => 'teacher',
                'status' => $number % 10 === 0 ? 'inactive' : 'active',
            ];
        }

        // =========================
        // TEACHERS - ADD 55
        // =========================

        for ($i = 46; $i <= 100; $i++) {
            $users[] = [
                'name' => 'Teacher ' . $i,
                'email' => 'teacher' . $i . '@talutun.edu.kh',
                'password' => $password,
                'role' => 'teacher',
                'status' => $i % 10 === 0 ? 'inactive' : 'active',
            ];
        }

        // =========================
        // TIMESTAMPS
        // =========================

        foreach ($users as &$user) {
            $user['created_at'] = now();
            $user['updated_at'] = now();
        }

        unset($user);

        // =========================
        // INSERT
        // =========================

        User::insert($users);
    }
}