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
        Language::create([
            "description" => "Italiano"
        ]);
        Language::create([
            "description" => "English"
        ]);

        $csv = storage_path("data/cities.csv");
        $file = fopen($csv, "r");
        while (($data = fgetcsv($file, 2000, ",")) !== false) {
            City::create([
                "name" => $data[0],
            ]);
        }

        DB::insert("INSERT INTO roles (id) VALUES (DEFAULT),(DEFAULT),(DEFAULT);");

        DB::insert("INSERT INTO categories (id) VALUES (DEFAULT);");

        RoleDescription::create([
            "roleId" => 1,
            "languageId" => 1,
            "description" => "amministratore"
        ]);

        RoleDescription::create([
            "roleId" => 1,
            "languageId" => 2,
            "description" => "admin"
        ]);

        RoleDescription::create([
            "roleId" => 2,
            "languageId" => 1,
            "description" => "utente"
        ]);

        RoleDescription::create([
            "roleId" => 2,
            "languageId" => 2,
            "description" => "user"
        ]);

        RoleDescription::create([
            "roleId" => 3,
            "languageId" => 1,
            "description" => "ospite"
        ]);

        RoleDescription::create([
            "roleId" => 3,
            "languageId" => 2,
            "description" => "guest"
        ]);

        CategoryDescription::create([
            "categoryId" => 1,
            "languageId" => 1,
            "description" => "azione"
        ]);

        CategoryDescription::create([
            "categoryId" => 1,
            "languageId" => 2,
            "description" => "action"
        ]);

        User::factory()->create([
            "roleId" => 1,
            "name" => "admin",
            "lastName" => "test user",
            "email" => "admin@gmail.com",
            "credits" => 0,
            "languageId" => 1
        ]);

        User::factory()->create([
            "roleId" => 2,
            "name" => "user",
            "lastName" => "test user",
            "email" => "user@gmail.com",
            "credits" => 0,
            "languageId" => 1
        ]);

        User::factory()->create([
            "roleId" => 3,
            "name" => "guest",
            "lastName" => "test user",
            "email" => "guest@gmail.com",
            "credits" => 0,
            "languageId" => 1
        ]);
    }
}
