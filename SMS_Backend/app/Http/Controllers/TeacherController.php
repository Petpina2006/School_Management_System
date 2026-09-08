<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
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
}
