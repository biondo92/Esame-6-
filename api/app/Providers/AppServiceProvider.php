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
        //questo gate controlla il ruolo dell utente e restituisce un flag se l utente possiede il ruolo necessario
        Gate::define("is_in_role", function (User $user, $required) {
            $claims = $user->getJWTCustomClaims();
            return $claims["role"] == $required;
        });
       //questo gate nell update dell utente controlla se l utente in corso di modifica corrisponde all utente loggato: se si allora la modifica è abilitata , altrimenti no
        Gate::define("owner", function (User $user, $required) {
            return $user->id == $required;
        });
    }
}
