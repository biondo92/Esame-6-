<?php

namespace App\Http\Controllers\Api;

use App\Models\Address;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UsersController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows("is_in_role", 1)) {

            $users = User::with(['role', 'addresses'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $users
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
        }

        // guest
        if (Gate::allows("is_in_role", 3)) {
        }
        return response()->json(
            [
                'status' => 'Forbidden',
                "data" => null
            ],
            403
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $data = request()->input();
            if (!isset($data["password"])) {
                $data["password"] = "password";
            }
            $rol = new User($data);
            $rol->save();
            $rol->refresh();


            $use = User::with(['role', 'addresses'])->find($rol->id);
            // return response()->json($category);
            return response()->json([
                'status' => 'Ok',
                "data" => $use
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
        }

        // guest
        if (Gate::allows("is_in_role", 3)) {
        }

        return response()->json([
            'status' => 'Forbidden',
            "data" => null
        ], 403);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $users =  User::with(['role', 'addresses'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $users
            ]);
        }
        $use =
            User::with(['role', 'addresses'])->find($id);
        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $use["id"])) {


            return response()->json([
                'status' => 'Ok',
                "data" => $use
            ]);
        }

        // guest
        if (Gate::allows("is_in_role", 3)) {
        }

        return response()->json([
            'status' => 'Forbidden',
            "data" => null
        ], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = request()->input();
        // admin
        if (Gate::allows("is_in_role", 1)) {

            $use = User::find($id);

            $use->update($data);
            $use->save();
            $users = User::with(['role', 'addresses'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $users
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $id)) {

            $use = User::find($id);

            $use->update($data);
            $use->save();
            $users = User::with(['role', 'addresses'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $users
            ]);
        }

        // guest
        if (Gate::allows("is_in_role", 3)) {
        }

        return response()->json([
            'status' => 'Forbidden',
            "data" => null
        ], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $res = Address::where('userId', $id)->delete();

            $res = User::where('id', $id)->delete();


            return response()->json([
                'status' => 'No content',
                "data" => null
            ], 204);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
        }

        // guest
        if (Gate::allows("is_in_role", 3)) {
        }

        return response()->json([
            'status' => 'Forbidden',
            "data" => null
        ], 403);
    }
}
