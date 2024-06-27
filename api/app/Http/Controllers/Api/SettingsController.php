<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Gate;

class SettingsController extends Controller
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
            $settings = Setting::all();
            return response()->json([
                'status' => 'Ok',
                "data" => $settings
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
            $sett = new Setting(request()->all());
            $sett->save();
            $sett->refresh();

            $setting = Setting::find($sett->id);
            return response()->json([
                'status' => 'Ok',
                "data" => $setting
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
            $setting = Setting::find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $setting
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
            $sett = Setting::find($id);

            $sett->update($data);
            $sett->save();
            $sett->refresh();


            return response()->json([
                'status' => 'Ok',
                "data" => $sett
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
            $res = Setting::where('id', $id)->delete();

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
