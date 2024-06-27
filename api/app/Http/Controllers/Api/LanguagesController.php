<?php

namespace App\Http\Controllers\Api;

use App\Models\Language;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class LanguagesController extends Controller
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
            $languages = Language::all();
            return response()->json([
                'status' => 'Ok',
                "data" => $languages
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $languages = Language::all();
            return response()->json([
                'status' => 'Ok',
                "data" => $languages
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
            $lang = new Language(request()->all());
            $lang->save();
            $lang->refresh();

            $language = Language::find($lang->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $language
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
            $language = Language::find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $language
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $language = Language::find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $language
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
            $lang = Language::find($id);

            $lang->update($data);
            $lang->save();
            $lang->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $lang
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
            $res = Language::where('id', $id)->delete();

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
