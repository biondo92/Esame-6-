<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // generiche


        Schema::create('settings', function (Blueprint $table) {
            $table->id("id");
            $table->string("code");
            $table->string("key");
            $table->string("value");
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->id("id");
            $table->string("name");
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id('id');
            $table->string('description');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id("id");
            $table->string('description');
            $table->timestamps();
            $table->softDeletes();
        });
        // generiche

        // utenti
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string("lastName")->nullable();
            $table->string('email');
            $table->string('password');
            $table->unsignedBigInteger("roleId")->default(2);
            $table->double("credits")->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('roleId')->references('id')->on('roles');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
        // fine utenti

        // cache
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });
        // fine cache



        // pat
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
        // fine pat




        Schema::create('addresses', function (Blueprint $table) {
            $table->id("id");
            $table->unsignedBigInteger("cityId");
            $table->unsignedBigInteger("userId");
            $table->string("address");
            $table->string("postalCode");
            $table->string("state");
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('cityId')->references('id')->on('cities');
            $table->foreign('userId')->references('id')->on('users');
        });

        Schema::create('films', function (Blueprint $table) {
            $table->id("id");
            $table->unsignedBigInteger('categoryId');
            $table->string('title');
            $table->text('image');
            $table->unsignedInteger('duration');
            $table->unsignedInteger('rating');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('categoryId')->references('id')->on('categories');
        });

        Schema::create('series', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('categoryId');
            $table->string('title');
            $table->text('image');
            $table->unsignedInteger('rating');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('categoryId')->references('id')->on('categories');
        });

        Schema::create('seasons', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('serieId');
            $table->string('title');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('serieId')->references('id')->on('series');
        });

        Schema::create('episodes', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('seasonId');
            $table->string('title');
            $table->unsignedBigInteger('duration');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('seasonId')->references('id')->on('seasons');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // utenti
        Schema::dropIfExists('users');


        // cache
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');


        // pat
        Schema::dropIfExists('personal_access_tokens');

        Schema::dropIfExists('episodes');
        Schema::dropIfExists('seasons');
        Schema::dropIfExists('series');
        Schema::dropIfExists('films');

        Schema::dropIfExists('categories');
        Schema::dropIfExists('users_addresses');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('users');

        Schema::dropIfExists('roles');
        Schema::dropIfExists('settings');
    }
};
