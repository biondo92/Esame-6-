<?php

namespace App\Http\Controllers\Api;

use App\Models\Episode;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EpisodesController extends Controller
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
            $episode = Episode::with(['season'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $episode
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $episode = Episode::with(['season'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $episode
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
            $epi = new Episode(request()->all());
            $epi->save();
            $epi->refresh();

            $episode = Episode::find($epi->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $episode
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
            $episode = Episode::with(['season'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $episode
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $episode = Episode::with(['season'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $episode
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
            $epi = Episode::find($id);

            $epi->update($data);
            $epi->save();
            $epi->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $epi
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
            $res = Episode::where('id', $id)->delete();

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
