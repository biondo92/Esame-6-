<?php

namespace App\Http\Controllers\Api;

use App\Models\City;
use App\Models\Role;
use App\Models\RoleDescription;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RolesController extends Controller
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
        // admin
        if (Gate::allows("is_in_role", 1)) {

            $roles = Role::with(['descriptions'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $roles
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $data = request()->input();
            $rol = new Role();
            $rol->save();
            $rol->refresh();

            foreach ($data["descriptions"] as $value) {
                $value["roleId"] = $rol->id;
                $desc = new RoleDescription($value);
                $desc->save();
            }

            $role = Role::with(['descriptions'])->find($rol->id);
            // return response()->json($category);
            return response()->json([
                'status' => 'Ok',
                "data" => $role
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
            $role = Role::with(['descriptions'])->find($id);
            // return response()->json($role);
            return response()->json([
                'status' => 'Ok',
                "data" => $role
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $data = request()->input();
            $role = Role::with(['descriptions'])->find($id);

            foreach ($role["descriptions"] as $key => $desc) {
                $desc->update($data["descriptions"][$key]);
            }

            $role = Role::with(['descriptions'])->find($role->id);
            // return response()->json($role);
            return response()->json([
                'status' => 'Ok',
                "data" => $role
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        // admin
        if (Gate::allows("is_in_role", 1)) {
            $res = RoleDescription::where('roleId', $id)->delete();
            if ($res) {
                $res = Role::where('id', $id)->delete();
            }
            if ($res) {
                return response()->json([
                    'status' => 'No content',
                    "data" => null
                ], 204);
            }
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
