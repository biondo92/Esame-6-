<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define("is_in_role", function (User $user, $required) {
            $claims = $user->getJWTCustomClaims();
            return $claims["role"] == $required;
        });

        Gate::define("owner", function (User $user, $required) {
            return $user->id == $required;
        });
    }
}
