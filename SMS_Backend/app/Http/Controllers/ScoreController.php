<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ScoreController extends Controller
{
    public function index()
    {
        $score = Score::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data Score Successfully',
                'status' => true,
                'data' => $score
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data Score Fails",
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
                'subject_id' => ['required', 'integer', 'exists:subjects,id'],
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
                'exam_type' => ['required', Rule::in(['quiz', 'assignment', 'midterm', 'final',])],
                'score' => ['required', 'numeric', 'min:0', 'max:999.99'],
                'max_score' => ['nullable', 'numeric', 'min:0', 'max:999.99'],
                'exam_date' => ['required', 'date'],
                'remark' => ['nullable', 'string'],
            ]);
            $score = Score::create($validated);
            return response()->json([
                'message' => "Create Score Successfully",
                'status' => true,
                'data' => $score
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create Score fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $score = Score::find($id);
            if (!$score) {
                return response()->json([
                    'message' => 'Score not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Score found successfully',
                'status' => true,
                'data' => $score
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Score Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $score = Score::find($id);
            if (!$score) {
                return response()->json([
                    'message' => 'Score not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $score->delete();
            return response()->json([
                'message' => 'Delete Score Successfully',
                'status' => true,
                'data' => $score
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete Score Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {

        try {
            $score = Score::find($id);
            if (!$score) {
                return response()->json([
                    'message' => 'Score not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'student_id' => ['required', 'integer', 'exists:students,id'],
                'subject_id' => ['required', 'integer', 'exists:subjects,id'],
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
                'exam_type' => ['required', Rule::in(['quiz','assignment','midterm','final',])],
                'score' => ['required', 'numeric', 'min:0', 'max:999.99'],
                'max_score' => ['nullable', 'numeric', 'min:0', 'max:999.99'],
                'exam_date' => ['required', 'date'],
                'remark' => ['nullable', 'string'],
            ]);
            $score->update($validated);
            return response()->json([
                'message' => 'Update Score Successfully',
                'status' => true,
                'data' => $score->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update Score Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
