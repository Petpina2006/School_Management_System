<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\AttendanceController;


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | Super Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::prefix('super-admin')->middleware('role:super_admin')->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class,'superAdminDashboard']);
        // Users
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        // Students
        Route::get('/students', [StudentController::class, 'index']);
        Route::post('/students', [StudentController::class, 'store']);
        Route::get('/students/{id}', [StudentController::class, 'show']);
        Route::put('/students/{id}', [StudentController::class, 'update']);
        Route::delete('/students/{id}', [StudentController::class, 'destroy']);
        // Teachers
        Route::get('/teachers', [TeacherController::class, 'index']);
        Route::post('/teachers', [TeacherController::class, 'store']);
        Route::get('/teachers/{id}', [TeacherController::class, 'show']);
        Route::put('/teachers/{id}', [TeacherController::class, 'update']);
        Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);
        // Classes
        Route::get('/classes', [ClassController::class, 'index']);
        Route::post('/classes', [ClassController::class, 'store']);
        Route::get('/classes/{id}', [ClassController::class, 'show']);
        Route::put('/classes/{id}', [ClassController::class, 'update']);
        Route::delete('/classes/{id}', [ClassController::class, 'destroy']);
        // Subjects
        Route::get('/subjects', [SubjectController::class, 'index']);
        Route::post('/subjects', [SubjectController::class, 'store']);
        Route::get('/subjects/{id}', [SubjectController::class, 'show']);
        Route::put('/subjects/{id}', [SubjectController::class, 'update']);
        Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
        // Class Subjects
        Route::get('/class-subjects', [ClassSubjectController::class, 'index']);
        Route::post('/class-subjects', [ ClassSubjectController::class, 'store']);
        Route::get('/class-subjects/{id}', [ ClassSubjectController::class, 'show']);
        Route::put('/class-subjects/{id}', [ ClassSubjectController::class, 'update' ]);
        Route::delete('/class-subjects/{id}', [ ClassSubjectController::class, 'destroy']);
        // Enrollments
        Route::get('/enrollments', [ EnrollmentController::class, 'index']);
        Route::post('/enrollments', [ EnrollmentController::class, 'store']);
        Route::get('/enrollments/{id}', [ EnrollmentController::class, 'show']);
        Route::put('/enrollments/{id}', [ EnrollmentController::class, 'update']);
        Route::delete('/enrollments/{id}', [ EnrollmentController::class, 'destroy']);
        // Scores
        Route::get('/scores', [ScoreController::class, 'index']);
        Route::post('/scores', [ScoreController::class, 'store']);
        Route::get('/scores/{id}', [ScoreController::class, 'show']);
        Route::put('/scores/{id}', [ScoreController::class, 'update']);
        Route::delete('/scores/{id}', [ScoreController::class, 'destroy']);
        // Attendance
        Route::get('/attendance', [ AttendanceController::class, 'index']);
        Route::post('/attendance', [ AttendanceController::class, 'store']);
        Route::get('/attendance/{id}', [ AttendanceController::class, 'show']);
        Route::put('/attendance/{id}', [ AttendanceController::class, 'update']);
        Route::delete('/attendance/{id}', [ AttendanceController::class, 'destroy']);
    });


    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::prefix('sadmin')->middleware('role:admin')->group(function () {

        // Dashboard
        Route::get('/admin/dashboard', [DashboardController::class,'adminDashboard']);
        // Students
        Route::get('/students', [StudentController::class, 'index']);
        Route::post('/students', [StudentController::class, 'store']);
        Route::get('/students/{id}', [StudentController::class, 'show']);
        Route::put('/students/{id}', [StudentController::class, 'update']);
        Route::delete('/students/{id}', [StudentController::class, 'destroy']);
        // Teachers
        Route::get('/teachers', [TeacherController::class, 'index']);
        Route::post('/teachers', [TeacherController::class, 'store']);
        Route::get('/teachers/{id}', [TeacherController::class, 'show']);
        Route::put('/teachers/{id}', [TeacherController::class, 'update']);
        Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);
        // Classes
        Route::get('/classes', [ClassController::class, 'index']);
        Route::post('/classes', [ClassController::class, 'store']);
        Route::get('/classes/{id}', [ClassController::class, 'show']);
        Route::put('/classes/{id}', [ClassController::class, 'update']);
        Route::delete('/classes/{id}', [ClassController::class, 'destroy']);
        // Subjects
        Route::get('/subjects', [SubjectController::class, 'index']);
        Route::post('/subjects', [SubjectController::class, 'store']);
        Route::get('/subjects/{id}', [SubjectController::class, 'show']);
        Route::put('/subjects/{id}', [SubjectController::class, 'update']);
        Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
        // Class Subjects
        Route::get('/class-subjects', [ClassSubjectController::class,'index']);
        Route::post('/class-subjects', [ClassSubjectController::class,'store' ]);
        Route::get('/class-subjects/{id}', [ClassSubjectController::class,'show']);
        Route::put('/class-subjects/{id}', [ClassSubjectController::class,'update']);
        Route::delete('/class-subjects/{id}', [ClassSubjectController::class,'destroy']);
        // Enrollments
        Route::get('/enrollments', [EnrollmentController::class,'index']);
        Route::post('/enrollments', [EnrollmentController::class,'store']);
        Route::get('/enrollments/{id}', [EnrollmentController::class,'show']);
        Route::put('/enrollments/{id}', [EnrollmentController::class,'update']);
        Route::delete('/enrollments/{id}', [EnrollmentController::class,'destroy']);
    });


    /*
    |--------------------------------------------------------------------------
    | Teacher Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('role:teacher')->group(function () {

        // Dashboard
        Route::get('/teacher/dashboard', [DashboardController::class,'teacherDashboard']);
        // Profile
        Route::get('/teacher/profile', [TeacherController::class,'profile' ]);
        // My Students
        Route::get('/teacher/students', [TeacherController::class,'myStudents']);
        // My Classes
        Route::get('/teacher/classes', [TeacherController::class,'myClasses']);
        // My Subjects
        Route::get('/teacher/subjects', [TeacherController::class,'mySubjects']);
        // Scores
        Route::get('/teacher/scores', [ ScoreController::class,'teacherScores']);
        Route::post('/teacher/scores', [ ScoreController::class,'store']);
        // Attendance
        Route::get('/teacher/attendance', [AttendanceController::class,'teacherAttendance']);
        Route::post('/teacher/attendance', [AttendanceController::class,'store']);
    });


    /*
    |--------------------------------------------------------------------------
    | Student Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('role:student')->group(function () {

        // Dashboard
        Route::get('/student/dashboard', [DashboardController::class,'studentDashboard']);
        // Profile
        Route::get('/student/profile', [StudentController::class,'profile' ]);
        // My Class
        Route::get('/student/class', [StudentController::class,'myClass']);
        // My Subjects
        Route::get('/student/subjects', [StudentController::class,'mySubjects']);
        // My Scores
        Route::get('/student/scores', [StudentController::class,'myScores']);
        // My Attendance
        Route::get('/student/attendance', [StudentController::class,'myAttendance']);
        // My Result
        Route::get('/student/result', [ StudentController::class,'result']);
    });
});
