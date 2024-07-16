import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.URL_BE + "/api/auth";

  constructor(private http: HttpClient) { }

  public isAuthenticated: boolean = false;

  public login(userName: string, password: string) {

    this.http.post(this._baseUrl + "/login", {
      email: userName,
      password: password
    })
    .subscribe(res => {
      console.log(res)
    })
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const isLogged = inject(AuthService).isAuthenticated;

  if (!isLogged) {
    const router = inject(Router);
    router.navigate(['/', 'login']);
  }

  return isLogged
}