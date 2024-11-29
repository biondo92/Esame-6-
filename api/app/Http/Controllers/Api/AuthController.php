<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' => [
                'login',
                'register',
                'getSalt'
            ]
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSalt()
    {
        $user = User::where('email', request('email'))->first();

        if (!$user) {
            return response()->json([
                'status' => 'KO',
                "data" => "si è verificato un errore"   //se l'utente non esiste non rivelare che l'utente non esiste
            ]);

        }

        $salt = $user->salt;
        return response()->json([
            'status' => 'Ok',
            "data" => $salt
        ]);
    }

    public function login()
    {
        $user = User::where('email', request('email'))->first();

        if (!$user) {
            return response()->json([
                'status' => 'KO',
                "data" => "si è verificato un errore"   //se l'utente non esiste non rivelare che l'utente non esiste
            ]);
        }

        if (request('password') == $user->password) {
            $token = JWTAuth::fromUser($user);
            return $this->respondWithToken($token);
        }
    }

    public function register()
    {
        $salt = bin2hex(random_bytes(16));
        $hashedPassword = hash('sha256', request('password') . $salt);

        $user = User::create([
            'email' => request('email'),
            'password' => $hashedPassword,
            'salt' => $salt, // Salva il salt generato
            'name' =>  request('name'),
            'lastName' =>  request('lastName'),
        ]);

        $user->refresh();

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
            "data" => $user//auth()->user()
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
