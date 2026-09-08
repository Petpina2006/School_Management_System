<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Classes;
use App\Models\Enrollment;
use App\Models\Score;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Super Admin Dashboard
    |--------------------------------------------------------------------------
    */

    public function superAdminDashboard()
    {
        try {
            $data = [
                'total_users' => User::count(),
                'total_students' => Student::count(),
                'total_teachers' => Teacher::count(),
                'total_classes' => Classes::count(),
                'total_subjects' => Subject::count(),
                'total_enrollments' => Enrollment::count(),
                'total_scores' => Score::count(),
                'total_attendance' => Attendance::count(),
                'active_users' => User::where('status','active')->count(),
                'inactive_users' => User::where('status','inactive')->count(),
                'active_students' => Student::where('status','active')->count(),
                'inactive_students' => Student::where('status','inactive')->count(),
            ];
            return response()->json([
                'status' => true,
                'message' => 'Fetch Super Admin Dashboard Successfully',
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Fetch Super Admin Dashboard Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    
    // Admin Dashboard
    public function adminDashboard()
    {
        try {

            $data = [
                'total_students' => Student::count(),
                'total_teachers' => Teacher::count(),
                'total_classes' => Classes::count(),
                'total_subjects' => Subject::count(),
                'total_enrollments' => Enrollment::count(),
                'active_students' => Student::where('status','active')->count(),
                'active_teachers' => Teacher::where('status','active')->count(),
            ];
            return response()->json([
                'status' => true,
                'message' => 'Fetch Admin Dashboard Successfully',
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Fetch Admin Dashboard Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

 
    //  | Teacher Dashboard
    public function teacherDashboard()
    {
        try {
            $user=Auth::user();
            $teacher = Teacher::where('user_id',$user->id)->first();
            if (!$teacher) {
                return response()->json([
                    'status' => false,
                    'message' => 'Teacher profile not found',
                    'data' => null
                ], 404);
            }
            $classes = Classes::where('teacher_id',$teacher->id)->count();
            $students = Enrollment::whereHas('class',
                function ($query) use ($teacher) {
                    $query->where(
                        'teacher_id',
                        $teacher->id
                    );
                }
            )->distinct('student_id')->count('student_id');

            $subjects = Subject::where('teacher_id',$teacher->id)->count();
            $scores = Score::where('teacher_id',$teacher->id)->count();
            $attendance = Attendance::where('teacher_id',$teacher->id)->count();
            $data = [
                'teacher' => $teacher,
                'total_classes' => $classes,
                'total_students' => $students,
                'total_subjects' => $subjects,
                'total_scores' => $scores,
                'total_attendance' => $attendance,
            ];
            return response()->json([
                'status' => true,
                'message' => 'Fetch Teacher Dashboard Successfully',
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Fetch Teacher Dashboard Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

// // Student Dashboard
//     public function studentDashboard()
//     {
//         try {
//             $user=Auth::user();
//             $student = Student::where('user_id',$user->id)->first();
//             if (!$student) {
//                 return response()->json([
//                     'status' => false,
//                     'message' => 'Student profile not found',
//                     'data' => null
//                 ], 404);
//             }
//             /*
//             |--------------------------------------------------------------------------
//             | Enrollment
//             |--------------------------------------------------------------------------
//             */

//             $enrollment = Enrollment::with([
//                 'class',
//                 'class.teacher'
//             ])
//                 ->where(
//                     'student_id',
//                     $student->id
//                 )
//                 ->latest()
//                 ->first();


//             /*
//             |--------------------------------------------------------------------------
//             | Subjects
//             |--------------------------------------------------------------------------
//             */

//             $subjects = 0;

//             if ($enrollment) {

//                 $subjects = $enrollment->class
//                     ->classSubjects()
//                     ->count();
//             }


//             /*
//             |--------------------------------------------------------------------------
//             | Scores
//             |--------------------------------------------------------------------------
//             */

//             $scores = Score::where(
//                 'student_id',
//                 $student->id
//             )->get();

//             $totalScores = $scores->count();

//             $averageScore = $totalScores > 0
//                 ? round($scores->avg('score'), 2)
//                 : 0;


//             /*
//             |--------------------------------------------------------------------------
//             | Attendance
//             |--------------------------------------------------------------------------
//             */

//             $attendance = Attendance::where(
//                 'student_id',
//                 $student->id
//             )->get();

//             $totalAttendance = $attendance->count();

//             $present = $attendance->where(
//                 'status',
//                 'present'
//             )->count();

//             $absent = $attendance->where(
//                 'status',
//                 'absent'
//             )->count();

//             $late = $attendance->where(
//                 'status',
//                 'late'
//             )->count();

//             $attendanceRate = $totalAttendance > 0
//                 ? round(
//                     ($present / $totalAttendance) * 100,
//                     2
//                 )
//                 : 0;


//             /*
//             |--------------------------------------------------------------------------
//             | Dashboard Data
//             |--------------------------------------------------------------------------
//             */

//             $data = [

//                 'student' => $student,

//                 'class' => $enrollment
//                     ? $enrollment->class
//                     : null,

//                 'total_subjects' => $subjects,

//                 'total_exams' => $totalScores,

//                 'average_score' => $averageScore,

//                 'attendance' => [
//                     'present' => $present,
//                     'absent' => $absent,
//                     'late' => $late,
//                     'rate' => $attendanceRate,
//                 ],
//             ];

//             return response()->json([
//                 'status' => true,
//                 'message' => 'Fetch Student Dashboard Successfully',
//                 'data' => $data
//             ], 200);

//         } catch (\Exception $e) {

//             return response()->json([
//                 'status' => false,
//                 'message' => 'Fetch Student Dashboard Failed',
//                 'error' => $e->getMessage(),
//                 'data' => null
//             ], 500);
//         }
//     }
// }
}