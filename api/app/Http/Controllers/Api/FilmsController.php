<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Models\Film;
use Illuminate\Support\Facades\Gate;

class FilmsController extends Controller
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
            $films = Film::with(['category'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $films
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $films = Film::with(['category'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $films
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
            $fil = new Film(request()->all());
            $fil->save();
            $fil->refresh();

            $film = Film::find($fil->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $film
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
            $film = Film::with(['category'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $film
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $film = Film::with(['category'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $film
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
            $fil = Film::find($id);

            $fil->update($data);
            $fil->save();
            $fil->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $fil
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
            $res = Film::where('id', $id)->delete();

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
