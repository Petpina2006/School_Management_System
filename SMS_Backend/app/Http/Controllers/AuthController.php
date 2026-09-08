<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
     public function register(Request $request){
        try{
            $validated=$request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', 'string', 'min:8'],
                'role' => ['nullable', 'string', Rule::in(['super_admin','admin','teacher','student',])],
                'status' => ['nullable', 'string', Rule::in(['active','inactive',])],
            ]);
            if($request['password']){
                $request['password']=Hash::make($request['password']);
            }
            $user=User::create($validated);
            return response()->json([
                'status'=>true,
                'message'=>'User register successfully',
                'data'=>$user
            ],201);
        }catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],500);
        }
    }

    public function login(Request $request){
        try{
            $validate=$request->validate([
                'email'=>['required','string','email'],
                'password'=>['required','string','min:8']
            ]);
            $user=User::where('email',$request->email)->first();
            if(!$user || !Hash::check($request->password,$user->password)){
                return response()->json([
                    'message'=>'You cannot have permission',
                ],403);
            }
            if($user->status !=='active'){
                return response()->json([
                    'message'=>'You must be active'
                ]);
            }
            //create token
            $token=$user->createToken('auth_login')->plainTextToken;
            return response()->json([
                'status'=>true,
                'message'=>'User login successfully',
                'data'=>$user,
                'token'=>$token,
                'Authorization'=>'Bearer'
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'status'=>false
            ],500);
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        try{
            return response()->json([
                'message'=>'logout successfully',
                'status'=>true
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'logout fail',
                'status'=>false,
                
            ],500);
        }
    }

     public function profile(){
        $user=Auth::user();
        return response()->json([
            'message'=>'user profile',
            'status'=>true,
            'data'=>$user
        ]);
    }
}
