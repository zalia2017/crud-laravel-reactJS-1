<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validateData['password'] = bcrypt($request->password);

        $user = User::create($validateData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response([ 'user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($loginData)) {
            // return response(['message' => 'Invalid Credentials']);
            return response(['success' => false]);
        }else{
            $authenticated_user = Auth::user();
            $user = User::find($authenticated_user->id);
        }
        $accessToken = $user->createToken('authToken')->accessToken;

        // return response(['user' => auth()->user(), 'access_token' => $accessToken]);
        return response(['success' => true, 'access_token' => $accessToken]);
    }
}
