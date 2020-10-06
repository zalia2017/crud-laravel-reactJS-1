<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //
    public function authenticate(Request $request)
    {
        $validateData =$request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials))
        {
            $msg = [
                'success' => true,
                'message' => 'Successfully Login'
            ];
        }else{
             $msg = [
                'success' => false,
                'message' => 'Failed Login!'
            ];
        }
        return response()->json($msg);
    }
}
