<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Classes;
use App\Models\ClassSubject;
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
    // Teacher Dashboard
public function teacherDashboard()
{
    try {

        /*
        |--------------------------------------------------------------------------
        | Current Teacher
        |--------------------------------------------------------------------------
        */

        $user = Auth::user();

        $teacher = Teacher::where(
            'user_id',
            $user->id
        )->first();

        if (!$teacher) {
            return response()->json([
                'status' => false,
                'message' => 'Teacher profile not found',
                'data' => null
            ], 404);
        }


        /*
        |--------------------------------------------------------------------------
        | Classes Assigned To Teacher
        |--------------------------------------------------------------------------
        */

        $classes = Classes::where(
            'teacher_id',
            $teacher->id
        )->get();


        /*
        |--------------------------------------------------------------------------
        | Total Classes
        |--------------------------------------------------------------------------
        */

        $totalClasses = $classes->count();


        /*
        |--------------------------------------------------------------------------
        | Students By Class
        |--------------------------------------------------------------------------
        |
        | We use Enrollment because your Classes model
        | does not have students() relationship.
        |
        */

        $classData = $classes->map(function ($class) {

            $studentCount = Enrollment::where(
                'class_id',
                $class->id
            )
            ->where('status', 'active')
            ->count();

            return [
                'className' => $class->class_name,
                'students' => $studentCount,
            ];

        })->values();


        /*
        |--------------------------------------------------------------------------
        | Total Students
        |--------------------------------------------------------------------------
        */

        $totalStudents = $classData->sum('students');


        /*
        |--------------------------------------------------------------------------
        | Total Subjects
        |--------------------------------------------------------------------------
        */

        $totalSubjects = ClassSubject::whereIn(
            'class_id',
            $classes->pluck('id')
        )->distinct('subject_id')->count('subject_id');


        /*
        |--------------------------------------------------------------------------
        | Attendance
        |--------------------------------------------------------------------------
        |
        | Get attendance records for students enrolled
        | in the teacher's classes.
        |
        */

        $classIds = $classes->pluck('id');


        $studentIds = Enrollment::whereIn(
            'class_id',
            $classIds
        )
        ->where('status', 'active')
        ->pluck('student_id');


        $attendance = Attendance::whereIn(
            'student_id',
            $studentIds
        )
        ->selectRaw('status, COUNT(*) as total')
        ->groupBy('status')
        ->pluck('total', 'status');


        /*
        |--------------------------------------------------------------------------
        | Attendance Pie Chart
        |--------------------------------------------------------------------------
        */

        $attendanceData = [
            [
                'name' => 'Present',
                'value' => (int) ($attendance['present'] ?? 0),
            ],

            [
                'name' => 'Absent',
                'value' => (int) ($attendance['absent'] ?? 0),
            ],

            [
                'name' => 'Late',
                'value' => (int) ($attendance['late'] ?? 0),
            ],

            [
                'name' => 'Excused',
                'value' => (int) ($attendance['excused'] ?? 0),
            ],
        ];


        /*
        |--------------------------------------------------------------------------
        | Total Attendance
        |--------------------------------------------------------------------------
        */

        $totalAttendance = $attendanceData[0]['value']
            + $attendanceData[1]['value']
            + $attendanceData[2]['value']
            + $attendanceData[3]['value'];


        /*
        |--------------------------------------------------------------------------
        | Total Scores
        |--------------------------------------------------------------------------
        */

        $totalScores = Score::whereIn(
            'student_id',
            $studentIds
        )->count();


        /*
        |--------------------------------------------------------------------------
        | Final Dashboard Response
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'status' => true,

            'message' => 'Fetch Teacher Dashboard Successfully',

            'data' => [

                /*
                | Summary
                */

                'total_classes' => $totalClasses,

                'total_students' => $totalStudents,

                'total_subjects' => $totalSubjects,

                'total_scores' => $totalScores,

                'total_attendance' => $totalAttendance,


                /*
                | Bar Chart
                */

                'class_data' => $classData,


                /*
                | Pie Chart
                */

                'attendance_data' => $attendanceData,

            ]

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