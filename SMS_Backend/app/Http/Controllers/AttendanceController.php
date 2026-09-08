<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AttendanceController extends Controller
{
    public function index()
    {
        try {
            $attendance = Attendance::oldest()->paginate(10);
            return response()->json([
                'message' => 'Attendance Feture Success.',
                'status' => true,
                'data' => $attendance->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Attendance False!',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 200);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'student_id' => ['required', 'integer', 'exists:students,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
                'attendance_date' => ['required', 'date'],
                'status' => ['required', Rule::in(['present', 'absent', 'late', 'excused'])],
                'remark' => ['nullable', 'string'],
            ]);
            $attendance = Attendance::create($validated);
            return response()->json([
                'message' => 'Created Attendance Successfully.',
                'status' => true,
                'data' => $attendance->fresh()
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create Attendance!',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $attendance = Attendance::find($id);
            if (!$attendance) {
                return response()->json([
                    'message' => 'Attendance Canot show!.',
                    'status' => true,
                    'data' => null
                ], 200);
            }
            return response()->json([
                'message' => 'Attendance Show Success.',
                'status' => true,
                'data' => $attendance->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Canot Show Attendance!',
                'status' => false,
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $attendance = Attendance::find($id);
            if (!$attendance) {
                return response()->json([
                    'message' => 'Canot Update!.',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'student_id' => ['required', 'integer', 'exists:students,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
                'attendance_date' => ['required', 'date'],
                'status' => ['required', Rule::in(['present', 'absent', 'late', 'excused'])],
                'remark' => ['nullable', 'string'],
            ]);
            $attendance->update($validated);
            return response()->json([
                'message' => 'Attendance Update Successfully.',
                'status' => true,
                'data' => $attendance->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Canot Update Attendance!',
                'status' => false,
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $attendance = Attendance::find($id);
            if (!$attendance) {
                return response()->json([
                    'message' => 'Cant Delete!',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $attendance->delete();
            return response()->json([
                'message' => 'Delete Sucessfully.',
                'status' => true,
                'data' => $attendance->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete False!',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
