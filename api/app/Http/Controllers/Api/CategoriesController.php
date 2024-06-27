<?php

namespace App\Http\Controllers\Api;

use App\Models\CategoryDescription;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Gate;

class CategoriesController extends Controller
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
            $categories = Category::with(['descriptions'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $categories
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $categories = Category::with(['descriptions'])->get();
            return response()->json([
                'status' => 'Ok',
                "data" => $categories
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
            $data = request()->input();
            $cat = new Category();
            $cat->save();
            $cat->refresh();

            foreach ($data["descriptions"] as $value) {
                $value["categoryId"] = $cat->id;
                $desc = new CategoryDescription($value);
                $desc->save();
            }

            $category = Category::with(['descriptions'])->find($cat->id);
            // return response()->json($category);
            return response()->json([
                'status' => 'Ok',
                "data" => $category
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
            $categories = Category::with(['descriptions'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $categories
            ]);
        }

        // user
        if (Gate::allows("is_in_role", 2)) {
            $categories = Category::with(['descriptions'])->find($id);
            return response()->json([
                'status' => 'Ok',
                "data" => $categories
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
            $cat = Category::with(['descriptions'])->find($id);

            foreach ($cat["descriptions"] as $key => $desc) {
                $desc->update($data["descriptions"][$key]);
            }

            $category = Category::with(['descriptions'])->find($cat->id);
            // return response()->json($category);
            return response()->json([
                'status' => 'Ok',
                "data" => $category
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
            $res = CategoryDescription::where('categoryId', $id)->delete();
            if ($res) {
                $res = Category::where('id', $id)->delete();
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
