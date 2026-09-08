<?php

namespace App\Http\Controllers;

use App\Models\ClassSubject;
use Illuminate\Http\Request;

class ClassSubjectController extends Controller
{
    public function index()
    {
        $classsubject = ClassSubject::oldest()->paginate(10);
        try {
            return response()->json([
                'message' => 'ClassSubject fetch successfully.',
                'status' => true,
                'data' => $classsubject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'ClassSubject false!',
                'status' => true,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'subject_id' => ['required', 'integer', 'exists:subjects,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
            ]);
            $classsubject = ClassSubject::create($validated);
            return response()->json([
                'message' => 'Created ClassSubject Successfully.',
                'status' => true,
                'data' => $classsubject
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create ClassSubject!',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $classsubject = ClassSubject::find($id);
            if (!$classsubject) {
                return response()->json([
                    'message' => 'ClassSubject Canot show!.',
                    'status' => true,
                    'data' => null
                ], 200);
            }
            return response()->json([
                'message' => 'ClassSubject Show Success.',
                'status' => true,
                'data' => $classsubject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Canot Show ClassSubject!',
                'status' => false,
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $classsubject = ClassSubject::find($id);
            if (!$classsubject) {
                return response()->json([
                    'message' => 'Canot Update!.',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'class_id' => ['required', 'integer', 'exists:classes,id'],
                'subject_id' => ['required', 'integer', 'exists:subjects,id'],
                'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
            ]);
            $classsubject->update($validated);
            return response()->json([
                'message' => 'ClassSubject Update Successfully.',
                'status' => true,
                'data' => $classsubject
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Canot Update ClassSubject!',
                'status' => false,
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $classsubject = ClassSubject::find($id);
            if (!$classsubject) {
                return response()->json([
                    'message' => 'Cant Delte!',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $classsubject->delete();
            return response()->json([
                'message' => 'Delete Sucessfully.',
                'status' => true,
                'data' => $classsubject->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Canot Update ClassSubject!',
                'status' => false,
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
