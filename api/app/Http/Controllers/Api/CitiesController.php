<?php

namespace App\Http\Controllers\Api;

use App\Models\City;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CitiesController extends Controller
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
            $cities = City::all();
            return response()->json([
                'status' => 'Ok',
                "data" => $cities
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $cities = City::all();
            return response()->json([
                'status' => 'Ok',
                "data" => $cities
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
            $cit = new City(request()->all());
            $cit->save();
            $cit->refresh();

            $city = City::find($cit->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $city
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
            $city = City::find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $city
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $city = City::find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $city
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
            $cit = City::find($id);

            $cit->update($data);
            $cit->save();
            $cit->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $cit
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
            $res = City::where('id', $id)->delete();

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
