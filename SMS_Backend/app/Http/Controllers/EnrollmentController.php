<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    public function index()
    {
        $enrollment = Enrollment::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data Enrollment Successfully',
                'status' => true,
                'data' => $enrollment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data Enrollment Fails",
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
                'student_id' => ['required', 'integer', 'exists:students,id'],
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'academic_year' => ['required', 'string', 'max:20'],
                'enrollment_date' => ['required', 'date'],
                'status' => ['nullable', 'in:active,completed,cancelled'],
            ]);
            $enrollment = Enrollment::create($validated);
            return response()->json([
                'message' => "Create Enrollment Successfully",
                'status' => true,
                'data' => $enrollment
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create Enrollment fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $enrollment = Enrollment::find($id);
            if (!$enrollment) {
                return response()->json([
                    'message' => 'Enrollment not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Enrollment found successfully',
                'status' => true,
                'data' => $enrollment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Enrollment Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $enrollment = Enrollment::find($id);
            if (!$enrollment) {
                return response()->json([
                    'message' => 'Enrollment not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $enrollment->delete();
            return response()->json([
                'message' => 'Delete Enrollment Successfully',
                'status' => true,
                'data' => $enrollment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete Enrollment Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {

        try {
            $enrollment = Enrollment::find($id);
            if (!$enrollment) {
                return response()->json([
                    'message' => 'Enrollment not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'student_id' => ['required','integer','exists:students,id',
                    Rule::unique('enrollments', 'student_id')
                        ->where('academic_year', $request->academic_year)
                        ->ignore($enrollment->id),
                ],
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'academic_year' => ['required', 'string', 'max:20'],
                'enrollment_date' => ['required', 'date'],
                'status' => ['required', Rule::in(['active','completed','cancelled',])],
            ]);
            $enrollment->update($validated);
            return response()->json([
                'message' => 'Update Enrollment Successfully',
                'status' => true,
                'data' => $enrollment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update Enrollment Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
