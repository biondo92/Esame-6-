import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.URL_BE + "/api/auth";

  constructor(private http: HttpClient) { }

  public token?: string
  public user?: User

  public isAuthenticated(): boolean
  {
    return this.user !== null && this.user !== undefined 
  }

  public async login(userName: string, password: string): Promise<void> {
    return new Promise((resolve, obj) =>{
      this.http.post(this._baseUrl + "/login", {
        email: userName,
        password: password
      })
      .subscribe(res => {
        console.log(res)
        this.token = (res as any).access_token;
  
        this.http.get(this._baseUrl + "/me", {
          headers: {
            "Authorization": "Bearer "+ this.token
          }
        })
        .subscribe(res => {
          console.log(res)
          this.user = (res as ApiResponse<User>).data
          this.user!.fullname = this.user?.name + " " + this.user?.lastName
          resolve()
        })
      })
    })
  }

  public async logout(): Promise<void> {
    return new Promise((resolve, obj) =>{
      this.http.get(this._baseUrl + "/logout", {
        headers: {
          "Authorization": "Bearer "+ this.token
        }
      })
      .subscribe(res => {
        console.log(res)
        this.user = undefined
        this.token = undefined
        resolve()
      })
    })
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const isLogged = inject(AuthService).isAuthenticated();

  // if (!isLogged) {
  //   const router = inject(Router);
  //   router.navigate(['/', 'login']);
  // }

  return isLogged
}