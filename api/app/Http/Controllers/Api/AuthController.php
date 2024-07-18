<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', [
            'except' => [
                'login', 
                'register'
            ]
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['statusText' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function register()
    {
        $user = new User(request()->all());
        $user->save();
        $user->refresh();
        // return response()->json($user->toArray());
        return response()->json([
            'status' => 'Ok', 
            "data" => $user->toArray()
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        // return response()->json(auth()->user());
        $u = auth()->user();
        $user = User::with(['role'])->find($u->getAuthIdentifier()); 
        return response()->json([
            'status' => 'Ok', 
            "data" =>  $user//auth()->user()
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'status' => 'Ok', 
            "data" => null
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function testRuoli()
    {
        $mex="";
        if(Gate::allows("is_in_role",1)){
          $mex="Admin";
        }
        elseif(Gate::allows("is_in_role",2)){
            $mex="Utente";
        }
        else{
            $mex="Ospite";
        }

        return response()->json($mex);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
