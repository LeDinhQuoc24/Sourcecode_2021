<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;


class LoginController extends Controller
{


    public function getLogin()
    {

        return view('login.login');
    }
    public function signUp()
    {
        return view('login.signup');
    }

    public function postSignUp(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required',

        ]);

        $user = new User([

            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'email_verified_at' => now()

        ]);

        $user->save();

        \Illuminate\Support\Facades\Auth::login($user);

        return redirect('/home')
            ->with('successAdd','User created successfully.');
    }

    public function postLogin(Request $request)
    {


            $arr = $request->only('email', 'password');

            $remember_me  = !empty( $request->remember_me );

        if(Auth::attempt($arr,$remember_me) ){
                $user=Auth::user();

                $user->save();

            return redirect('/welcome');



        }else{

                return back()->with('loginFail','Login failed.');
            }

    }

    public function welcome()
    {
//        Redis::set('name', 'Taylor');
//        $name = Redis::get('name');
//        dd($name); // Taylor


//        if(Auth::user()){
//            $string1 = 'laravel_cache:';
//            $string2 = Session()->getId();
//            $string3 = $string1.$string2;
//            dd($string3);
//        }

        $user = Auth::user();
        return view('login.welcome')->with(['user'=> $user]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }

}
