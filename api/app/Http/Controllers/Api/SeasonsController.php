<?php

namespace App\Http\Controllers\Api;

use App\Models\Season;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SeasonsController extends Controller
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
            $season = Season::with(['serie', 'episodes'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $season
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $season = Season::with(['serie', 'episodes'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $season
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $sea = new Season(request()->all());
            $sea->save();
            $sea->refresh();

            $season = Season::find($sea->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $season
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

            $season = Season::with(['serie', 'episodes'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $season
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {

            $season = Season::with(['serie', 'episodes'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $season
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
        // admin
        if (Gate::allows("is_in_role", 1)) {
            $data = request()->input();
            $sea = Season::find($id);

            $sea->update($data);
            $sea->save();
            $sea->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $sea
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
            $res = Season::where('id', $id)->delete();

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
