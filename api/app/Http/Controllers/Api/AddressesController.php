<?php

namespace App\Http\Controllers\Api;

use App\Models\Address;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AddressesController extends Controller
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
            $address = Address::with(['city', 'user'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $address
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
        $data = request()->all();

        // admin
        if (Gate::allows("is_in_role", 1)) {
            $addre = new Address($data);
            $addre->save();
            $addre->refresh();

            $address = Address::find($addre->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $data["userId"])) {

            $addre = new Address($data);
            $addre->save();
            $addre->refresh();

            $address = Address::find($addre->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
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
     * Display the specified resource.
     */
    public function show(string $id)
    {

        // admin
        if (Gate::allows("is_in_role", 1)) {
            $address = Address::with(['city', 'user'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
            ]);
        }
        $addre = Address::find($id);
        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $addre["userId"])) {

            $address = Address::with(['city', 'user'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
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

            $addre = Address::find($id);

            $addre->update($data);
            $addre->save();
            $address = Address::with(['city', 'user'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $data["userId"])) {

            $addre = Address::find($id);

            $user = auth()->user();
            $data["userId"] = $user->id;

            $addre->update($data);
            $addre->save();
            $address = Address::with(['city', 'user'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $address
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

            $res = Address::where('id', $id)->delete();

            if ($res) {
                return response()->json([
                    'status' => 'No content',
                    "data" => null
                ], 204);
            }
        }
        $addre = Address::find($id);
        // user
        if (Gate::allows("is_in_role", 2) && Gate::allows("owner", $addre["userId"])) {

            $res = Address::where('id', $id)->delete();

            if ($res) {
                return response()->json([
                    'status' => 'No content',
                    "data" => null
                ], 204);
            }
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
