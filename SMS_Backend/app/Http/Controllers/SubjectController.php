<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubjectController extends Controller
{
    public function index()
    {
        $subject = Subject::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data Subject Successfully',
                'status' => true,
                'data' => $subject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data Subject Fails",
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
                'subject_code' => ['required', 'string', 'max:255', 'unique:subjects,subject_code'],
                'subject_name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'status' => ['required', 'in:active,inactive'],
            ]);
            $subject = Subject::create($validated);
            return response()->json([
                'message' => "Create Subject Successfully",
                'status' => true,
                'data' => $subject
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create Subject fail',
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
            $subject = Subject::find($id);
            if (!$subject) {
                return response()->json([
                    'message' => 'Subject not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Subject found successfully',
                'status' => true,
                'data' => $subject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Subject Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $subject = Subject::find($id);
            if (!$subject) {
                return response()->json([
                    'message' => 'Subject not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $subject->delete();
            return response()->json([
                'message' => 'Delete Subject Successfully',
                'status' => true,
                'data' => $subject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete Subject Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {

        try {
            $subject = Subject::find($id);
            if (!$subject) {
                return response()->json([
                    'message' => 'Subject not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'subject_code' => ['required','string','max:255',Rule::unique('subjects', 'subject_code')->ignore($subject->id),],
                'subject_name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'status' => ['required', Rule::in(['active', 'inactive'])],
            ]);
            $subject->update($validated);
            return response()->json([
                'message' => 'Update Subject Successfully',
                'status' => true,
                'data' => $subject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update Subject Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
