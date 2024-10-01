<?php

namespace App\Http\Controllers\Api;

use App\Models\Serie;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class SeriesController extends Controller
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

            $serie = Serie::with(['category', 'seasons', 'seasons.episodes'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $serie
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {

            $serie = Serie::with(['category', 'seasons'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $serie
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
            $ser = new Serie(request()->all());
            $ser->save();
            $ser->refresh();

            $serie = Serie::find($ser->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $serie
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
            $serie = Serie::with(['category', 'seasons'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $serie
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $serie = Serie::with(['category', 'seasons'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $serie
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
            $ser = Serie::find($id);

            $ser->update($data);
            $ser->save();
            $ser->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $ser
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
            $res = Serie::where('id', $id)->delete();

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
