<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    public function index()
    {
        $student = Student::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data Student Successfully',
                'status' => true,
                'data' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data Student Fails",
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
                'student_code' => ['required', 'string', 'max:50', 'unique:students,student_code'],
                'Full_name' => ['required', 'string', 'max:255'],
                'gender' => ['required', 'in:male,female'],
                'date_of_birth' => ['required', 'date'],
                'phone' => ['required', 'string', 'max:20'],
                'address' => ['nullable', 'string', 'max:500'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,svg', 'max:2048'],
                'parent_name' => ['required', 'string', 'max:255'],
                'parent_phone' => ['required', 'string', 'max:20'],
                'status' => ['required', 'in:active,inactive'],
            ]);
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $photoName = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('Students'), $photoName);
                $validated['photo'] = $photoName;
            }
            $student = Student::create($validated);
            return response()->json([
                'message' => "Create Student Successfully",
                'status' => true,
                'data' => $student
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create Student fail',
                $e->getMessage(),
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $student = Student::find($id);
            if (!$student) {
                return response()->json([
                    'message' => 'Student not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Student found successfully',
                'status' => true,
                'data' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Student Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $student = Student::find($id);
            if (!$student) {
                return response()->json([
                    'message' => 'Student not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $student->delete();
            return response()->json([
                'message' => 'Delete Student Successfully',
                'status' => true,
                'data' => $student
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete Student Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {

        try {
            $student = Student::find($id);
            if (!$student) {
                return response()->json([
                    'message' => 'Student not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'user_id' => ['nullable', 'integer', 'exists:users,id'],
                'student_code' => ['required','string','max:50',Rule::unique('students', 'student_code')->ignore($student->id),],
                'Full_name' => ['required', 'string', 'max:255'],
                'gender' => ['required', Rule::in(['male', 'female'])],
                'date_of_birth' => ['required', 'date'],
                'phone' => ['required', 'string', 'max:20'],
                'address' => ['nullable', 'string', 'max:500'],
                'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,svg', 'max:2048'],
                'parent_name' => ['required', 'string', 'max:255'],
                'parent_phone' => ['required', 'string', 'max:20'],
                'status' => ['required', Rule::in(['active', 'inactive'])],
            ]);
            $student->update($validated);
            return response()->json([
                'message' => 'Update Student Successfully',
                'status' => true,
                'data' => $student->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update Student Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
