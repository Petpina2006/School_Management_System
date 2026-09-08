<?php

use App\Http\Controllers\ClassController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// user
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
// student
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
// teacher
Route::get('/teachers', [TeacherController::class, 'index']);
Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::put('/teachers/{id}', [TeacherController::class, 'update']);
Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);
// class
Route::get('/classes',[ClassController::class, 'index']);
Route::post('/classes', [ClassController::class, 'store']);
Route::get('/classes/{id}', [ClassController::class, 'show']);
Route::put('/classes/{id}', [ClassController::class, 'update']);
Route::delete('/classes/{id}', [ClassController::class, 'destroy']);
   
// subject
Route::get('/subjects',[SubjectController::class, 'index']);
Route::post('/subjects', [SubjectController::class, 'store']);
Route::get('/subjects/{id}', [SubjectController::class, 'show']);
Route::put('/subjects/{id}', [SubjectController::class, 'update']);
Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']); 
Route::delete('/classes/{id}', [ClassController::class, 'destroy']);  
// subject class
Route::get('/classsubject', [ClassSubjectController::class, 'index']);
Route::post('/classsubject', [ClassSubjectController::class, 'store']);
Route::get('/classsubject/{id}', [ClassSubjectController::class, 'show']);
Route::put('/classsubject/{id}', [ClassSubjectController::class, 'update']);
Route::delete('/classsubject/{id}', [ClassSubjectController::class, 'destroy']);
// enrollment
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::get('/enrollments/{id}', [EnrollmentController::class, 'show']);
Route::put('/enrollments/{id}', [EnrollmentController::class, 'update']);
Route::delete('/enrollments/{id}', [EnrollmentController::class, 'destroy']);
// Attendance
Route::get('/attendance', [Attendance::class, 'index']);
Route::post('/attendance', [Attendance::class, 'store']);
Route::get('/attendance/{id}', [Attendance::class, 'show']);
Route::put('/attendance/{id}', [Attendance::class, 'update']);
Route::delete('/attendance/{id}', [Attendance::class, 'destroy']);
// score
Route::get('/scores', [ScoreController::class, 'index']);
Route::post('/scores', [ScoreController::class, 'store']);
Route::get('/scores/{id}', [ScoreController::class, 'show']);
Route::put('/scores/{id}', [ScoreController::class, 'update']);
Route::delete('/scores/{id}', [ScoreController::class, 'destroy']);

