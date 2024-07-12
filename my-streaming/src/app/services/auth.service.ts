import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.URL_BE + "/api/auth";

  constructor(private http: HttpClient) { }

  public login(userName:string,password:string){
    
    this.http.post(this._baseUrl + "/login", {
      email:userName,
      password:password
    }).subscribe(res=>console.log(res))
  }
}
