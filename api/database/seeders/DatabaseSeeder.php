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
       //carica le città da un CSV e le inserisce a DB
        $csv = storage_path("data/cities.csv");
        $file = fopen($csv, "r");
        while (($data = fgetcsv($file, 2000, ",")) !== false) {
            City::create([
                "name" => $data[0],
            ]);
        }
        //crea i ruoli dell applicazione

        DB::insert("INSERT INTO roles (description) VALUES ('Admin'),('User'),('Guest');");

        DB::insert("INSERT INTO categories (description) VALUES ('Action'),('Fantasy');");

        $adminSalt =  bin2hex(random_bytes(16));
        $userSalt =  bin2hex(random_bytes(16));
        $guestSalt = bin2hex(random_bytes(16));

        User::factory()->create([
            "roleId" => 1,
            "name" => "admin",
            "lastName" => "test user",
            "email" => "admin@gmail.com",
            "credits" => 0,
            'salt' => $adminSalt,
            'password' => hash('sha256', 'password' . $adminSalt),
        ]);

        User::factory()->create([
            "roleId" => 2,
            "name" => "user",
            "lastName" => "test user",
            "email" => "user@gmail.com",
            "credits" => 0,
            'salt' => $userSalt,
            'password' => hash('sha256', 'password' . $userSalt),
        ]);

        User::factory()->create([
            "roleId" => 3,
            "name" => "guest",
            "lastName" => "test user",
            "email" => "guest@gmail.com",
            "credits" => 0,
            'salt' => $guestSalt,
            'password' => hash('sha256', 'password' . $guestSalt),
        ]);
    }
}
