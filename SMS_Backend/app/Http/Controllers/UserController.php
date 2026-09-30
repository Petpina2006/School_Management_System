<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    public function index()
    {
        $user = User::oldest('id')->paginate(10);
        try {
            return response()->json([
                'message' => 'Fetch All Data User Successfully',
                'status' => true,
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Fetch Data User Fails",
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
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', 'string', 'min:8'],
                'role' => ['nullable', 'string', Rule::in(['super_admin','admin','teacher','student',])],
                'status' => ['nullable', 'string', Rule::in(['active','inactive',])],
            ]);
            $validate['password'] = Hash::make($validated['password']);
            $user = User::create($validated);
            return response()->json([
                'message' => "Create User Successfully",
                'status' => true,
                'data' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Create User fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'message' => 'User not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            return response()->json([
                'message' => 'User found successfully',
                'status' => true,
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User Show Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'message' => 'User not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $user->delete();
            return response()->json([
                'message' => 'Delete User Successfully',
                'status' => true,
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Delete User Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {

        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'message' => 'User not found',
                    'status' => false,
                    'data' => null
                ], 404);
            }
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required','string','email','max:255',Rule::unique('users', 'email')->ignore($user->id),],
                'password' => ['nullable', 'string', 'min:8'],
                'role' => ['nullable', Rule::in(['super_admin','admin','teacher','student',])],
                'status' => ['nullable', Rule::in(['active','inactive',])],
            ]);
            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }
            $user->update($validated);
            return response()->json([
                'message' => 'Update User Successfully',
                'status' => true,
                'data' => $user->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Update User Fail',
                'status' => false,
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
    public function superAdminProfile()
{
    try {

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated',
                'data' => null
            ], 401);
        }

        if ($user->role !== 'super_admin') {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
                'data' => null
            ], 403);
        }

        return response()->json([
            'status' => true,
            'message' => 'Super Admin profile fetched successfully',

            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ]

        ], 200);

    } catch (\Throwable $e) {

        return response()->json([
            'status' => false,
            'message' => 'Failed to fetch Super Admin profile',
            'error' => $e->getMessage(),
            'data' => null
        ], 500);
    }
}


public function updateSuperAdminProfile(Request $request)
{
    try {

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated',
                'data' => null
            ], 401);
        }

        if ($user->role !== 'super_admin') {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
                'data' => null
            ], 403);
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255'
            ],
        ]);

        $user->name = $validated['name'];
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Super Admin profile updated successfully',

            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ]

        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            'status' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors(),
            'data' => null
        ], 422);

    } catch (\Throwable $e) {

        return response()->json([
            'status' => false,
            'message' => 'Failed to update Super Admin profile',
            'error' => $e->getMessage(),
            'data' => null
        ], 500);
    }
}

}
