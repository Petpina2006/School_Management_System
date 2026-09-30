# School Management System (SMS)

A full-stack **Academic Management System** for TALUTUN High School — covering students, teachers,
classes, subjects, enrollments, scores and attendance, with role-based dashboards for each account type.

| | |
|---|---|
| **Backend** | Laravel 12 REST API (PHP 8.2+, Laravel Sanctum token auth) |
| **Database** | PostgreSQL (SQLite supported for local bootstrapping) |
| **Frontend** | React 19 SPA (Vite 8, Tailwind CSS 4, Recharts) |
| **Auth** | Laravel Sanctum Bearer tokens + Google OAuth (Socialite, WIP) |
| **Status** | In active development — Super Admin & Teacher portals ~70% complete |

---

## Table of Contents

- [Developers](#developers)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database](#database)
- [Demo Accounts](#demo-accounts)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [Available Scripts & Commands](#available-scripts--commands)
- [Security](#security)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [License](#license)

---

## Developers

| # | Name | Role |
|---|------|------|
| 1 | **Pet Pina** | Full-Stack Developer |
| 2 | **Phern Sopheng** | Full-Stack Developer |

---

## Features

### Super Admin
- School-wide dashboard with donut/pie analytics (Recharts) — totals for users, students, teachers, classes, subjects, scores, attendance, enrollments
- Super Admin profile view/edit
- Full CRUD for **Users, Students, Teachers, Classes, Subjects, Class Subjects, Enrollments, Scores, Attendance**
- Server-side pagination (10/page) with Laravel paginator meta
- Search + status/gender/grade/exam-type filters, table view / edit / delete modals
- Student photo upload & display

### Admin
- Admin dashboard with aggregate statistics
- CRUD for Students, Teachers, Classes, Subjects, Class Subjects, Enrollments
- (API complete; SPA screens pending)

### Teacher
- Personal dashboard: class/subject/student/score/attendance totals + bar & pie charts
- Own profile view/edit
- Lists of *my* students, *my* classes, *my* subjects (scoped by `teacher.user_id`)
- Create scores and attendance records

### Student
- Login, registration and role-based redirect
- (Student portal API and screens are planned — see [Roadmap](#known-limitations--roadmap))

### Cross-cutting
- Sanctum token authentication with role middleware (`super_admin`, `admin`, `teacher`, `student`)
- Light/dark theme toggle persisted to `localStorage`
- Responsive, animated UI (Framer Motion) with Tailwind CSS 4
- Rich demo dataset via 9 ordered seeders (100 records per domain table)

---

## Tech Stack

### Languages

| Language | Version | Used for |
|----------|---------|----------|
| **PHP** | `^8.2` | Laravel API, models, migrations, seeders |
| **JavaScript (ESM)** | Node `^20.19` / `>=22.12` | React SPA, Vite tooling, oxlint |
| **JSX** | — | All frontend UI components |
| **CSS** | Tailwind CSS v4 (CSS-first config) | Utility-first styling |
| **SQL** | PostgreSQL dialect | Schema, indexes, enum types |

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `laravel/framework` | `^12.0` (installed 12.69.1) | Core framework |
| `laravel/sanctum` | `^4.3` (installed 4.3.3) | API token authentication |
| `laravel/socialite` | `^5.31` | Google OAuth (half-wired) |
| `laravel/tinker` | `^2.10` | REPL |
| `laravel/pint` | `^1.13` (dev) | Code style formatter |
| `laravel/sail` | `^1.41` (dev) | Docker dev environment |
| `laravel/pail` | `^1.2` (dev) | Log tailing |
| `phpunit/phpunit` | `^11.5` (dev) | Test runner |
| `fakerphp/faker` | `^1.23` (dev) | Test data generation |
| `mockery/mockery` | `^1.6` (dev) | Mocking |

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` / `react-dom` | `^19.2.8` | UI runtime |
| `react-router-dom` | `^7.18.3` | Client-side routing & route guards |
| `tailwindcss` + `@tailwindcss/vite` | `^4.3.3` | Styling (no `tailwind.config.js` — CSS-first) |
| `recharts` | `^3.10.1` | Dashboard charts |
| `framer-motion` | `^13.2.0` | Animations / transitions |
| `lucide-react` | `^1.43.0` | Icon set |
| `react-icons` | `^5.7.0` | Brand icons (FcGoogle, FaGithub) |
| `sweetalert2` | `^11.26.25` | Installed, not yet wired |
| `vite` | `^8.2.2` (dev) | Dev server & bundler |
| `@vitejs/plugin-react` | `^6.1.0` (dev) | React fast refresh |
| `oxlint` | `^1.79.0` (dev) | Linter (ESLint replacement) |

> **HTTP client:** the SPA uses a hand-rolled `fetch` wrapper (`src/services/api.js`) — **Axios is not used**, so there are no interceptors. A bearer token is read from `localStorage` on every request.

---

## Folder Structure

```
School_Management_System/
├── README.md
├── SMS_Backend/                          # Laravel 12 JSON REST API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php            # register, login, logout, profile
│   │   │   │   ├── DashboardController.php       # super-admin / admin / teacher stats
│   │   │   │   ├── UserController.php            # user CRUD + super-admin profile
│   │   │   │   ├── StudentController.php         # student CRUD
│   │   │   │   ├── TeacherController.php         # teacher CRUD + self-service
│   │   │   │   ├── ClassController.php           # class CRUD
│   │   │   │   ├── SubjectController.php         # subject CRUD
│   │   │   │   ├── ClassSubjectController.php    # class<->subject assignment
│   │   │   │   ├── EnrollmentController.php      # student enrollment CRUD
│   │   │   │   ├── ScoreController.php           # score CRUD
│   │   │   │   ├── AttendanceController.php      # attendance CRUD
│   │   │   │   └── Controller.php                # abstract base
│   │   │   └── Middleware/
│   │   │       └── RoleMiddleware.php            # role:alias guard (401/403 JSON)
│   │   ├── Models/
│   │   │   ├── User.php            # HasApiTokens, Notifiable, HasFactory
│   │   │   ├── Student.php         # user, enrollments, scores, attendance
│   │   │   ├── Teacher.php         # user, classes, classSubjects, scores, attendance
│   │   │   ├── Classes.php         # teacher, enrollments, classSubjects, scores
│   │   │   ├── Subject.php         # classSubjects, scores
│   │   │   ├── ClassSubject.php    # pivot: class + subject + teacher
│   │   │   ├── Enrollment.php      # pivot: student + class + academic_year
│   │   │   ├── Score.php           # student + subject + class + teacher
│   │   │   └── Attendance.php      # student + class + teacher
│   │   └── Providers/
│   │       └── AppServiceProvider.php
│   ├── bootstrap/
│   │   ├── app.php                 # middleware alias registration ('role')
│   │   ├── providers.php
│   │   └── cache/
│   ├── config/
│   │   ├── app.php  auth.php  cache.php  database.php  filesystems.php
│   │   ├── logging.php  mail.php  queue.php  sanctum.php  session.php
│   │   └── services.php            # + custom 'google' Socialite block
│   ├── database/
│   │   ├── factories/
│   │   │   └── UserFactory.php
│   │   ├── migrations/             # 12 migrations -> 17 tables
│   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   │   ├── 2026_09_03_053220_create_students_table.php
│   │   │   ├── 2026_09_03_053229_create_teachers_table.php
│   │   │   ├── 2026_09_03_053240_create_classes_table.php
│   │   │   ├── 2026_09_03_053248_create_subjects_table.php
│   │   │   ├── 2026_09_03_053256_create_class_subjects_table.php
│   │   │   ├── 2026_09_03_053305_create_enrollments_table.php
│   │   │   ├── 2026_09_03_053319_create_scores_table.php
│   │   │   ├── 2026_09_03_053330_create_attendance_table.php
│   │   │   └── 2026_09_03_053613_create_personal_access_tokens_table.php
│   │   └── seeders/                # run in this exact order
│   │       ├── DatabaseSeeder.php
│   │       ├── UserSeeder.php          # 206 users
│   │       ├── StudentSeeder.php       # 100 students  (STU001-STU100)
│   │       ├── TeacherSeeder.php       # 100 teachers  (TCH001-TCH100)
│   │       ├── ClassSeeder.php         # 100 classes   (grades 7-12)
│   │       ├── SubjectSeeder.php       # 103 subjects  (SUB001-SUB103)
│   │       ├── ClassSubjectSeeder.php  # 100 assignments
│   │       ├── EnrollmentSeeder.php    # 100 enrollments
│   │       ├── ScoreSeeder.php         # 100 scores
│   │       └── AttendanceSeeder.php    # 100 attendance rows
│   ├── public/
│   │   ├── index.php  .htaccess  robots.txt  favicon.ico
│   │   └── Students/             # uploaded student photos
│   ├── resources/
│   │   ├── css/app.css  js/app.js  js/bootstrap.js
│   │   └── views/welcome.blade.php
│   ├── routes/
│   │   ├── api.php               # 105 route statements
│   │   ├── console.php
│   │   └── web.php
│   ├── storage/
│   │   ├── app/{private,public}/
│   │   ├── framework/{cache,sessions,views,testing}/
│   │   └── logs/
│   ├── tests/
│   │   ├── TestCase.php
│   │   ├── Feature/ExampleTest.php
│   │   └── Unit/ExampleTest.php
│   ├── .env  .env.example  .editorconfig  .gitattributes  .gitignore
│   ├── artisan  composer.json  composer.lock  package.json  phpunit.xml
│   └── vite.config.js
│
└── sms-frontend/                        # React 19 SPA
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── main.jsx                     # BrowserRouter + AuthProvider mount
    │   ├── App.jsx                      # pass-through to MainRouter
    │   ├── index.css                    # @import "tailwindcss";
    │   ├── context/
    │   │   └── AuthContext.jsx          # token/user in localStorage, useAuth() hook
    │   ├── layouts/
    │   │   ├── SuperAdminLayout.jsx
    │   │   └── TeacherLayout.jsx
    │   ├── routes/
    │   │   ├── MainRouter.jsx           # full route table
    │   │   ├── ProtectedRoute.jsx       # requires token
    │   │   └── RoleRoute.jsx            # requires allowedRoles
    │   ├── services/                    # API layer (fetch wrapper + modules)
    │   │   ├── api.js                   # API_URL + apiFetch()
    │   │   ├── authApi.js
    │   │   ├── userApi.js
    │   │   ├── studentApi.js
    │   │   ├── teacherApi.js
    │   │   ├── classApi.js
    │   │   ├── subjectApi.js
    │   │   ├── enrollmentApi.js
    │   │   ├── scoreApi.js
    │   │   ├── super-admin/
    │   │   │   └── superAdminApi.js     # dashboard + profile
    │   │   └── teachers/
    │   │       └── teacherApi.js        # teacher portal endpoints
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx            # split-screen, social + email login
    │   │   │   └── Register.jsx
    │   │   ├── super-admin/             # 16 pages
    │   │   │   ├── Dashboard.jsx  SuperAdminProfile.jsx
    │   │   │   ├── Users.jsx  CreateUser.jsx
    │   │   │   ├── Students.jsx  CreateStudents.jsx
    │   │   │   ├── Teachers.jsx  CreateTeachers.jsx
    │   │   │   ├── Classes.jsx  CreateClasses.jsx
    │   │   │   ├── Subjects.jsx  CreateSubjects.jsx
    │   │   │   ├── Enrollments.jsx  CreateEnrollment.jsx
    │   │   │   └── Scores.jsx  CreateScore.jsx
    │   │   └── teacher/                # 7 pages
    │   │       ├── TeacherDashboard.jsx  TeacherProfile.jsx
    │   │       ├── TeacherStudents.jsx   TeacherClasses.jsx
    │   │       ├── TeacherSubjects.jsx   TeacherScores.jsx
    │   │       └── TeacherAttendance.jsx
    │   ├── components/
    │   │   ├── super-admin/            # 43 files
    │   │   │   ├── Sidebar.jsx  Navbar.jsx  Charts.jsx
    │   │   │   ├── users/       Header, Stats, Filters, Table, Pagination, Modal
    │   │   │   ├── students/    Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   ├── teachers/    Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   ├── classes/     Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   ├── subjects/    Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   ├── enrollments/ Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   ├── scores/      Header, Stats, Filter, Table, Pagination, Modal
    │   │   │   └── profile/     SuperAdminProfileCard.jsx
    │   │   └── teacher/               # 18 files
    │   │       ├── TeacherSidebar.jsx  TeacherHeader.jsx
    │   │       ├── dashboard/  TeacherStats.jsx  TeacherOverview.jsx
    │   │       ├── profile/    TeacherProfileCard.jsx
    │   │       ├── students/   StudentHeader.jsx  StudentFilter.jsx  StudentTable.jsx
    │   │       ├── classes/    ClassHeader.jsx  ClassCard.jsx
    │   │       ├── subjects/   SubjectHeader.jsx  SubjectTable.jsx
    │   │       ├── scores/     ScoreHeader.jsx  ScoreStats.jsx  ScoreTable.jsx  ScoreModal.jsx
    │   │       └── attendance/ AttendanceHeader.jsx  AttendanceStats.jsx
    │   │                     AttendanceTable.jsx  AttendanceModal.jsx
    │   └── assets/                      # unused Vite template leftovers
    ├── .oxlintrc.json
    ├── index.html
    ├── package.json  package-lock.json
    └── vite.config.js
```

---

## Requirements

| Tool | Version | Notes |
|------|---------|-------|
| **PHP** | `>= 8.2` | with `pdo_pgsql` (or `pdo_sqlite`), `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo` |
| **Composer** | `>= 2.7` | backend dependency install |
| **Node.js** | `^20.19.0` or `>=22.12.0` | required by Vite 8 |
| **npm** | `>= 10` | frontend dependency install |
| **PostgreSQL** | `>= 14` | primary database (SQLite works for a quick start) |
| **Composer dev extras** | optional | `sail` (Docker), `pint` (formatter) |

---

## Installation

### 1. Clone

```bash
git clone <repository-url>
cd School_Management_System
```

### 2. Backend

```bash
cd SMS_Backend

composer install

cp .env.example .env          # Windows: copy .env.example .env
php artisan key:generate

# configure the database in .env (see Environment Configuration)
php artisan migrate
php artisan db:seed           # demo dataset - run only on a fresh database
php artisan storage:link      # exposes storage/app/public at /storage
```

Optional — start the API with the queue worker, log tailer and Vite in one command:

```bash
composer dev
# runs: artisan serve | queue:listen | pail | npm run dev
```

Or just the API:

```bash
php artisan serve              # http://127.0.0.1:8000
```

### 3. Frontend

```bash
cd sms-frontend

npm install
npm run dev                    # http://localhost:5173
```

The SPA calls the API cross-origin, so the backend must be running on `http://127.0.0.1:8000`.

---

## Environment Configuration

### Backend — `SMS_Backend/.env`

`.env` is git-ignored. The values below are the ones that actually matter.

```ini
APP_NAME="TALUTUN SMS"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

# --- Database (PostgreSQL) ---
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=school_management
DB_USERNAME=postgres
DB_PASSWORD=<your-password>

# --- Auth / Security ---
BCRYPT_ROUNDS=12
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SANCTUM_TOKEN_PREFIX=

# --- Session / Cache / Queue ---
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local

# --- Mail (defaults to the log driver) ---
MAIL_MAILER=log
MAIL_FROM_ADDRESS="no-reply@talutun.edu.kh"

# --- Google OAuth (optional, Socialite) ---
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/api/auth/google/callback
```

> **Not yet present in `.env.example`:** `SANCTUM_STATEFUL_DOMAINS`, `CORS_*`, `GOOGLE_*` and `AUTH_*` keys. Add them manually if you need stateful sessions, cross-origin control or OAuth. There is also **no `config/cors.php`** — see [Security](#security).

### Frontend

The SPA has **no `.env` file**. The API base URL is hard-coded:

```js
// sms-frontend/src/services/api.js
const API_URL = "http://127.0.0.1:8000/api";
```

Five additional URLs are hard-coded and must be updated alongside it when you point the app at another host:

| File | Purpose |
|------|---------|
| `src/pages/auth/Login.jsx` | social OAuth redirect |
| `src/pages/auth/Register.jsx` | social OAuth redirect (uses `localhost`, not `127.0.0.1`) |
| `src/pages/super-admin/Enrollments.jsx` | student/class dropdowns (raw `fetch`) |
| `src/components/super-admin/students/StudentsModal.jsx` | student photo URL |

Migrating to `import.meta.env.VITE_API_URL` is on the [roadmap](#known-limitations--roadmap).

---

## Database

**17 tables** after a full migration. `users` is extended with a role enum and a status enum; every
domain table uses foreign keys with cascading deletes and unique composite constraints.

| Table | Key columns | Notes |
|-------|-------------|-------|
| `users` | `name`, `email` (unique), `password`, **`role`**, **`status`** | `role` enum: `super_admin\|admin\|teacher\|student` (default `student`) · `status` enum: `active\|inactive` |
| `students` | `user_id` (FK unique), `student_code` (unique), `Full_name`, `gender`, `date_of_birth`, `phone`, `photo`, `address`, `parent_name`, `parent_phone`, `status` | `gender` enum: `male\|female` |
| `teachers` | `user_id` (FK unique), `teacher_code` (unique), `first_name`, `last_name`, `gender`, `date_of_birth`, `phone`, `photo`, `address`, `hire_date`, `specialization`, `status` | |
| `classes` | `class_name`, `grade`, `section`, `room`, `academic_year`, `teacher_id` (FK), `status` | model class is `App\Models\Classes` |
| `subjects` | `subject_code` (unique), `subject_name`, `description`, `status` | |
| `class_subjects` | `class_id`, `subject_id`, `teacher_id` (all FK) | **unique(`class_id`, `subject_id`)** — curriculum map |
| `enrollments` | `student_id`, `class_id`, `academic_year`, `enrollment_date`, `status` | **unique(`student_id`, `academic_year`)** · status: `active\|completed\|cancelled` |
| `scores` | `student_id`, `subject_id`, `class_id`, `teacher_id`, `exam_type`, `score` (5,2), `max_score` (5,2, default 100), `exam_date`, `remark` | `exam_type` enum: `quiz\|assignment\|midterm\|final` |
| `attendance` | `student_id`, `class_id`, `teacher_id`, `attendance_date`, `status`, `remark` | **unique(`student_id`, `attendance_date`)** · status: `present\|absent\|late\|excused` · *table name is singular* |
| `personal_access_tokens` | Sanctum token table | `abilities`, `last_used_at`, `expires_at` |
| `sessions`, `cache`, `cache_locks`, `jobs`, `job_batches`, `failed_jobs`, `password_reset_tokens` | | framework defaults |

### Relationship map

```
User 1──1 Student        Class   N──1 Teacher
User 1──1 Teacher        Class   N──* Enrollment  N──1 Student
                        Class   N──* ClassSubject N──1 Subject, N──1 Teacher
                        Subject N──* Score        N──1 Student, Class, Teacher
                        Student N──* Attendance   N──1 Class, Teacher
```

### Seeding

```bash
php artisan migrate:fresh --seed   # always use fresh: unique indexes block a re-seed
```

`DatabaseSeeder` runs these **in order** (each seeder asserts its minimum row counts and throws otherwise):

`UserSeeder` → `StudentSeeder` → `TeacherSeeder` → `ClassSeeder` → `SubjectSeeder` →
`ClassSubjectSeeder` → `EnrollmentSeeder` → `ScoreSeeder` → `AttendanceSeeder`

Producing: **206 users**, 100 students, 100 teachers, 100 classes, 103 subjects, 100 class-subject
assignments, 100 enrollments, 100 scores, 100 attendance records.

---

## Demo Accounts

All seeded accounts share the password **`password123`**.

| Role | Email | Notes |
|------|-------|-------|
| Super Admin | `sok.dara@talutun.edu.kh` | Full system access |
| Admin | `*@talutun.edu.kh` | 5 admins (one is `inactive`) |
| Teacher | `teacher1@talutun.edu.kh` … `teacher100@talutun.edu.kh` | Linked to `TCH001`–`TCH100` |
| Student | `student1@talutun.edu.kh` … `student100@student.talutun.edu.kh` | Linked to `STU001`–`STU100` |

> Teacher and student emails follow `teacherN@talutun.edu.kh` / `studentN@student.talutun.edu.kh`
> (N = 1…100). Use the Super Admin account to reach every screen.

---

## API Reference

Base URL: `http://127.0.0.1:8000/api` · All routes are prefixed with `/api`.
Authentication uses `Authorization: Bearer <token>` (Sanctum).

**Response envelope** (uniform across controllers):

```jsonc
// success
{ "message": "...", "status": true, "data": { } }

// failure
{ "message": "...", "status": false, "error": "...", "data": null }
```

> Send `Accept: application/json` to receive JSON 401/403/422 responses instead of a redirect.

### Public

| Method | Endpoint | Action |
|--------|----------|--------|
| `POST` | `/api/register` | Create account, returns token |
| `POST` | `/api/login` | Authenticate, returns `{ token, data: user }` |

### Authenticated (any role)

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/api/profile` | Current user |
| `POST` | `/api/logout` | Revoke the current token |

### Super Admin — `role:super_admin` — 48 routes

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/api/super-admin/dashboard` | Aggregate school statistics |
| `GET` `PUT` | `/api/super-admin/profile` | View / update own profile |
| `GET` `POST` | `/api/super-admin/{resource}` | List (paginated) / create |
| `GET` `PUT` `DELETE` | `/api/super-admin/{resource}/{id}` | Show / update / delete |

`{resource}` ∈ `users`, `students`, `teachers`, `classes`, `subjects`, `class-subjects`, `enrollments`, `scores`, `attendance`

### Admin — `role:admin` — 36 routes

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/api/sadmin/admin/dashboard` | Aggregate statistics |
| `GET` `POST` | `/api/sadmin/{resource}` | List / create |
| `GET` `PUT` `DELETE` | `/api/sadmin/{resource}/{id}` | Show / update / delete |

`{resource}` ∈ `students`, `teachers`, `classes`, `subjects`, `class-subjects`, `enrollments`

### Teacher — `role:teacher` — 10 routes

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/api/teacher/dashboard` | Own class/student/score/attendance totals + chart data |
| `GET` `PUT` | `/api/teacher/profile` | View / update own profile |
| `GET` | `/api/teacher/students` | Students in my classes |
| `GET` | `/api/teacher/classes` | My classes |
| `GET` | `/api/teacher/subjects` | My subjects |
| `GET` `POST` | `/api/teacher/scores` | List / create scores ⚠️ GET handler missing |
| `GET` `POST` | `/api/teacher/attendance` | List / create attendance ⚠️ GET handler missing |

### Student — `role:student` — 7 routes (declared, not yet implemented)

| Method | Endpoint | Action |
|--------|----------|--------|
| `GET` | `/api/student/dashboard` | ⚠️ handler commented out |
| `GET` | `/api/student/profile` | ⚠️ handler missing |
| `GET` | `/api/student/class` | ⚠️ handler missing |
| `GET` | `/api/student/subjects` | ⚠️ handler missing |
| `GET` | `/api/student/scores` | ⚠️ handler missing |
| `GET` | `/api/student/attendance` | ⚠️ handler missing |
| `GET` | `/api/student/result` | ⚠️ handler missing |

### Pagination

`index()` endpoints return a Laravel `LengthAwarePaginator` under `data`:

```jsonc
{
  "message": "...",
  "status": true,
  "data": {
    "current_page": 1,
    "last_page": 11,
    "per_page": 10,
    "total": 106,
    "data": [ /* rows */ ]
  }
}
```

---

## Frontend Routes

| Path | Page | Guard |
|------|------|-------|
| `/login` | `auth/Login` | public |
| `/register` | `auth/Register` | public |
| `/super-admin/dashboard` | Dashboard + Recharts | token + `super_admin` |
| `/super-admin/profile` | `SuperAdminProfile` | token + `super_admin` |
| `/super-admin/users` · `/create` | Users · CreateUser | token + `super_admin` |
| `/super-admin/students` · `/create` | Students · CreateStudents | token + `super_admin` |
| `/super-admin/teachers` · `/create` | Teachers · CreateTeachers | token + `super_admin` |
| `/super-admin/classes` · `/create` | Classes · CreateClasses | token + `super_admin` |
| `/super-admin/subjects` · `/create` | Subjects · CreateSubjects | token + `super_admin` |
| `/super-admin/enrollments` · `/create` | Enrollments · CreateEnrollment | token + `super_admin` |
| `/super-admin/scores` · `/create` | Scores · CreateScore | token + `super_admin` |
| `/teacher/dashboard` | TeacherDashboard | token + `teacher` |
| `/teacher/profile` | TeacherProfile | token + `teacher` |
| `/teacher/students` | TeacherStudents | token + `teacher` |
| `/teacher/classes` | TeacherClasses | token + `teacher` |
| `/teacher/subjects` | TeacherSubjects | token + `teacher` |
| `/teacher/scores` | TeacherScores | token + `teacher` |
| `/teacher/attendance` | TeacherAttendance | token + `teacher` |
| `/unauthorized` | Inline 403 page | public |
| `*` | Redirect → `/login` | — |

`ProtectedRoute` checks `isAuthenticated` (token present in `localStorage`);
`RoleRoute` checks `user.role` against an `allowedRoles` prop.

### Frontend architecture

```
main.jsx  →  BrowserRouter  →  AuthProvider  →  App  →  MainRouter
                                                          ├── ProtectedRoute
                                                          │     └── RoleRoute
                                                          │           └── RoleLayout
                                                          │                 └── Page
                                                          │                       └── Header / Stats / Filter / Table / Pagination / Modal
```

- **State:** React Context only (`AuthContext` → `useAuth()`). No Redux/Zustand, no data-fetching library.
- **HTTP:** one shared `apiFetch(endpoint, options)` helper; token read from `localStorage.token` per call.
- **Theming:** `dark` class toggled on `<html>`; preference stored in `localStorage.theme`.
- **Linting:** `oxlint` with `react/rules-of-hooks` and `react/only-export-components` enabled via `.oxlintrc.json`.

---

## Available Scripts & Commands

### Frontend (`sms-frontend`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run **oxlint** |

### Backend (`SMS_Backend`)

| Command | Description |
|---------|-------------|
| `php artisan serve` | Development API server |
| `php artisan migrate` | Run migrations |
| `php artisan migrate:fresh --seed` | Rebuild the schema and reseed demo data |
| `php artisan db:seed` | Reseed (requires an empty/fresh schema) |
| `php artisan route:list` | List all 105 API routes |
| `php artisan storage:link` | Link `storage/app/public` → `public/storage` |
| `php artisan queue:work` / `queue:listen` | Process the database queue |
| `php artisan test` | Run PHPUnit (`Unit` + `Feature`) |
| `vendor/bin/pint` | Format PHP code (PSR-12) |
| `composer dev` | `serve` + `queue:listen` + `pail` + `vite` concurrently |
| `php artisan pail` | Tail `storage/logs/laravel.log` |

---

## Security

### What is in place

| Control | Implementation |
|---------|----------------|
| **Password hashing** | Bcrypt via the `hashed` cast on `User::$password` (`BCRYPT_ROUNDS=12`) |
| **Token authentication** | Laravel Sanctum 4 personal access tokens (`personal_access_tokens` table) |
| **Token transport** | `Authorization: Bearer <token>` header — not a URL query parameter |
| **Server-side authorization** | `auth:sanctum` + custom `RoleMiddleware` (alias `role`) on every protected route group |
| **Role enforcement** | `RoleMiddleware` returns `401` when unauthenticated and `403` when `user.role` is not in the allowed list |
| **Input validation** | All controllers validate with `$request->validate([...])` (rule-based, 422 on failure) |
| **Secret management** | `.env` is git-ignored; `APP_KEY`, `DB_PASSWORD` and OAuth secrets stay out of version control |
| **Secret exposure** | `User::$hidden = ['password', 'remember_token']` keeps credentials out of JSON |
| **Database constraints** | Unique indexes on codes/emails, foreign keys with `cascadeOnDelete`, enum-constrained status columns |
| **Parameterized queries** | Eloquent ORM throughout — no raw string interpolation |
| **CSRF** | Protected by Laravel's `ValidateCsrfToken` for the session guard |

### Open risks to address before production

These are **known, currently-open items** in the codebase — documented here for transparency, not yet fixed.

| # | Issue | Impact | Suggested fix |
|---|-------|--------|---------------|
| 1 | **`POST /api/register` accepts a client-supplied `role`** | A visitor can self-register as `super_admin` — **critical privilege escalation** | Ignore the `role` field on public registration, or hard-code `role = 'student'`. Add the route to a rate limiter. |
| 2 | **`UserController@store` hashes into an undefined variable** (`$validate[...]` instead of `$validated[...]`) | Admin-created accounts are stored with an **unhashed password** | Rename the variable to `$validated`; keep relying on the `hashed` cast |
| 3 | **No `config/cors.php` / `CORS_*` env keys** | The SPA runs on `:5173` and the API on `:8000`; only framework defaults apply | Publish CORS config and restrict `allowed_origins` to the SPA origin (never `*` with credentials) |
| 4 | **Sanctum tokens never expire** (`expiration => null`) | A leaked token grants indefinite access | Set `SANCTUM_TOKEN_EXPIRATION` (e.g. `1440`) and add a refresh/revoke flow |
| 5 | **Tokens and the user object in `localStorage`** | Any XSS can exfiltrate the bearer token | Prefer httpOnly cookies with Sanctum's SPA mode, or memory + short-lived tokens |
| 6 | **No rate limiting on auth endpoints** | `/api/login` and `/api/register` are brute-forceable | Add `throttle:6,1` to both routes |
| 7 | **No policies or Gates** | Authorization is role-only; no per-record ownership checks | Add `app/Policies` + `$this->authorize()` for self-service resources |
| 8 | **`ScoreController@store` / `AttendanceController@store` trust `student_id` / `teacher_id` from the body** | A teacher can record grades or attendance for students outside their classes | Verify the target rows belong to the authenticated teacher |
| 9 | **No centralized 401 handling on the client** | An expired token leaves the SPA on a blank screen instead of redirecting | Add a 401 branch in `apiFetch` that clears storage and navigates to `/login` |
| 10 | **Inconsistent logout** — `Sidebar.jsx` navigates without clearing storage | Tokens survive a "logout" in one path | Route all logouts through `AuthContext.logout()` |
| 11 | **Uploads bypass the filesystem layer** (`$file->move(public_path('Students'), ...)`) | No validation of image type/size beyond `mimes`, no storage abstraction, predictable `time().ext` names | Use the `public` disk (`php artisan storage:link`), store UUID names, enforce `max:` size limits |
| 12 | **`APP_DEBUG=true` and a weak DB password in the working `.env`** | Stack traces leak internals; credentials are trivially guessable | Set `APP_DEBUG=false` in any shared environment; rotate the DB and Google client secrets before deploying |
| 13 | **No test coverage** | Regressions are caught only manually | Add feature tests for auth and the role middleware (see below) |

### Reporting a vulnerability

Please report security issues privately to the developers (**Pet Pina**, **Phern Sopheng**) rather
than opening a public issue. Include reproduction steps and the affected endpoint.

---

## Known Limitations & Roadmap

### Missing backend handlers (routes will return HTTP 500)

| Route | Missing method |
|-------|----------------|
| `GET /api/teacher/scores` | `ScoreController@teacherScores` |
| `GET /api/teacher/attendance` | `AttendanceController@teacherAttendance` |
| `GET /api/student/dashboard` | `DashboardController@studentDashboard` (present but fully commented out) |
| `GET /api/student/profile` · `/class` · `/subjects` · `/scores` · `/attendance` · `/result` | `StudentController` methods |

### Missing frontend routes

Referenced by the UI but not registered in `MainRouter.jsx`:

- `/admin/dashboard` and `/student/dashboard` — `Login.jsx` redirects `admin` and `student` roles here, which currently bounces them back to `/login` in a loop
- `/super-admin/attendance` — linked from the Super Admin sidebar
- `/super-admin/settings` — linked from the Navbar dropdown

### Other gaps

- **Google OAuth is half-wired.** Socialite is installed, `config/services.php` and the `.env` keys are in place, and `AuthController` has a commented-out `redirectToGoogle()`, but **no `/api/auth/google` route exists** — the social buttons 404.
- **No test coverage.** `tests/` still contains only the two stock Laravel stubs. The `DB_CONNECTION=sqlite / :memory:` overrides in `phpunit.xml` are commented out, so tests currently run against the real `.env` database — enable them before writing tests.
- **No CI/CD, Docker or deployment config.** No `.github/`, `Dockerfile`, or `vercel.json`.
- **No `.gitignore` at the repository root** — only `SMS_Backend/.gitignore` and `sms-frontend/.gitignore` exist.
- **Dead code to clean up:** empty `src/App.css`, unused `src/assets/*` (Vite template leftovers), `public/icons.svg`, the commented-out route block in `superAdminApi.js`, a duplicated set of teacher endpoints in both `services/teacherApi.js` and `services/teachers/teacherApi.js`, and `sweetalert2` installed but never imported (native `alert()` is used instead).
- **Near-duplicate UI shells.** `SuperAdminLayout`/`TeacherLayout` and their Sidebar/Header pairs are structurally identical; `Navbar.jsx` (299 lines) and `TeacherHeader.jsx` (552 lines) implement the same behaviour twice.
- **Consolidation candidates:** move the API base URL to `import.meta.env.VITE_API_URL`; replace the raw `fetch` calls in `Enrollments.jsx` with the shared `apiFetch` helper; add error boundaries and lazy-loaded routes.

### Suggested next steps

1. Fix the 7 security items flagged as high risk (registration `role`, password hashing typo, CORS, token expiry, rate limiting, logout consistency).
2. Implement the missing student and teacher API handlers, then build the Student portal screens.
3. Add the Admin SPA screens to cover the existing `/api/sadmin/*` routes.
4. Complete Google OAuth or remove the dead Socialite wiring.
5. Add feature tests for auth + `RoleMiddleware`, then enable the in-memory SQLite test database.
6. Consolidate the duplicated layout/chrome components and remove dead code.

---

## License

Released under the **MIT License** — see [`composer.json`](SMS_Backend/composer.json).

---

<div align="center">

**School Management System** — TALUTUN High School

Developed by **Pet Pina** & **Phern Sopheng**

</div>
