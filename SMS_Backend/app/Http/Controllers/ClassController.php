<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        $class = Classes::oldest()->paginate(10);
        return response()->json([
            'message' => "Fetch Data Successfully!",
            'status' => true,
            'data' => $class
        ], 200);
    }

    public function store(Request $request)
    {
        try{
            $validated = $request->validate([
                'class_name'    => 'required|string|max:255',
                'grade'         => 'required|string|max:50',
                'section'       => 'nullable|string|max:50',
                'room'          => 'nullable|string|max:50',
                'academic_year' => 'required|string|max:20',
                'teacher_id'    => 'required|exists:teachers,id'
            ]);
            $class = Classes::create($validated);
            return response()->json([
                'message' => 'Classed created successfully!',
                'status' => true,
                'data' => $class
            ], 201);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Classed create false',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $class = Classes::find($id);
            if (!$class) {
                return response()->json([
                    'message' => 'Classes Not Found!',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'Found Classes.',
                'status' => true,
                'data'  => $class
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Class Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $class = Classes::find($id);
            if (!$class) {
                return response()->json([
                    'message' => 'Classes Update False!',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'class_name'    => 'required|string|max:255',
                'grade'         => 'required|string|max:50',
                'section'       => 'nullable|string|max:50',
                'room'          => 'nullable|string|max:50',
                'academic_year' => 'required|string|max:20',
                'teacher_id'    => 'required|exists:teachers,id'
            ]);
            $class->update($validated);
            return response()->json([
                'message' => 'Updated Successfully.',
                'status' => true,
                'data' => $class
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Classes Update False!',
                'status' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id){
        try {
            $class = Classes::find($id);
            if (!$class) {
                return response()->json([
                    'message' => 'Classes Deleted False!',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $class->delete();
            return response()->json([
                'message' => 'Classed Deleted Successfully.',
                'status' => true,
                'data' => $class
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Classed Deleted False!',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
