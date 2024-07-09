<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Language;
use App\Models\City;
use App\Models\RoleDescription;
use App\Models\CategoryDescription;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $csv = storage_path("data/cities.csv");
        $file = fopen($csv, "r");
        while (($data = fgetcsv($file, 2000, ",")) !== false) {
            City::create([
                "name" => $data[0],
            ]);
        }

        DB::insert("INSERT INTO roles (description) VALUES ('Admin'),('User'),('Guest');");

        DB::insert("INSERT INTO categories (description) VALUES ('Action'),('Fantasy');");



        User::factory()->create([
            "roleId" => 1,
            "name" => "admin",
            "lastName" => "test user",
            "email" => "admin@gmail.com",
            "credits" => 0,

        ]);

        User::factory()->create([
            "roleId" => 2,
            "name" => "user",
            "lastName" => "test user",
            "email" => "user@gmail.com",
            "credits" => 0,

        ]);

        User::factory()->create([
            "roleId" => 3,
            "name" => "guest",
            "lastName" => "test user",
            "email" => "guest@gmail.com",
            "credits" => 0,

        ]);
    }
}
