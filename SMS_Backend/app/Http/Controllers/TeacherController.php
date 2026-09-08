<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TeacherController extends Controller
{

    public function index()
    {
        $teacher = Teacher::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data Teacher Successfully',
                'status' => true,
                'data' => $teacher
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data Teacher Fails",
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => ['nullable', 'integer', 'exists:users,id'],
                'teacher_code' => ['required', 'string', 'max:255', 'unique:teachers,teacher_code'],
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'gender' => ['required', 'in:male,female'],
                'date_of_birth' => ['nullable', 'date'],
                'phone' => ['nullable', 'string', 'max:255'],
                'address' => ['nullable', 'string'],
                'hire_date' => ['nullable', 'date'],
                'specialization' => ['nullable', 'string', 'max:255'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,svg', 'max:2048'],
                'status' => ['nullable', 'in:active,inactive'],
            ]);
            $teacher = Teacher::create($validated);
            return response()->json([
                'message' => "Create Teacher Successfully",
                'status' => true,
                'data' => $teacher
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create Teacher fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $teacher = Teacher::find($id);
            if (!$teacher) {
                return response()->json([
                    'message' => 'Teacher not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Teacher found successfully',
                'status' => true,
                'data' => $teacher
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Teacher Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $teacher = Teacher::find($id);
            if (!$teacher) {
                return response()->json([
                    'message' => 'Teacher not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $teacher->delete();
            return response()->json([
                'message' => 'Delete Teacher Successfully',
                'status' => true,
                'data' => $teacher
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete Teacher Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {

        try {
            $teacher = Teacher::find($id);
            if (!$teacher) {
                return response()->json([
                    'message' => 'Teacher not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'user_id' => ['nullable', 'integer', 'exists:users,id'],
                'teacher_code' => ['required','string','max:255',Rule::unique('teachers', 'teacher_code')->ignore($teacher->id)],
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'gender' => ['required', Rule::in(['male', 'female'])],
                'date_of_birth' => ['nullable', 'date'],
                'phone' => ['nullable', 'string', 'max:255'],
                'address' => ['nullable', 'string'],
                'hire_date' => ['nullable', 'date'],
                'specialization' => ['nullable', 'string', 'max:255'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,svg', 'max:2048'],
                'status' => ['nullable', Rule::in(['active', 'inactive'])],
            ]);
            $teacher->update($validated);
            return response()->json([
                'message' => 'Update Teacher Successfully',
                'status' => true,
                'data' => $teacher->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update Teacher Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

     /*
    |--------------------------------------------------------------------------
    | Teacher Profile
    |--------------------------------------------------------------------------
    */

    public function profile()
    {
        try {

            $user = Auth::user();

            $teacher = Teacher::with('user')->where('user_id', $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    'status' => false,
                    'message' => 'Teacher profile not found',
                    'data' => null
                ], 404);
            }
            return response()->json([
                'status' => true,
                'message' => 'Fetch Teacher Profile Successfully',
                'data' => $teacher
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Fetch Teacher Profile Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
// my student
    public function myStudents()
    {
        try {

            $user = Auth::user();
            $teacher = Teacher::where('user_id', $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    'status' => false,
                    'message' => 'Teacher profile not found',
                    'data' => null
                ], 404);
            }
            $students = Student::whereHas('enrollments.class', function ($query) use ($teacher) {
                $query->where('teacher_id', $teacher->id);
            })
            ->with('user')
            ->distinct()
            ->get();
            return response()->json([
                'status' => true,
                'message' => 'Fetch My Students Successfully',
                'data' => $students
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Fetch My Students Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
// myclass
    public function myClasses()
    {
        try {

            $user = Auth::user();
            $teacher = Teacher::where('user_id', $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    'status' => false,
                    'message' => 'Teacher profile not found',
                    'data' => null
                ], 404);
            }

            $classes = Classes::where('teacher_id', $teacher->id)
                ->with('teacher')
                ->latest()
                ->get();

            return response()->json([
                'status' => true,
                'message' => 'Fetch My Classes Successfully',
                'data' => $classes
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Fetch My Classes Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
// mysubject
    public function mySubjects()
    {
        try {

            $user = Auth::user();
            $teacher = Teacher::where('user_id', $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    'status' => false,
                    'message' => 'Teacher profile not found',
                    'data' => null
                ], 404);
            }
            $subjects = Subject::whereHas('classSubjects', function ($query) use ($teacher) {
                $query->where('teacher_id', $teacher->id);
            })
            ->with([
                'classSubjects' => function ($query) use ($teacher) {
                    $query->where('teacher_id', $teacher->id)
                        ->with('class');
                }
            ])
            ->distinct()
            ->get();

            return response()->json([
                'status' => true,
                'message' => 'Fetch My Subjects Successfully',
                'data' => $subjects
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Fetch My Subjects Failed',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
