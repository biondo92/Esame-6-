import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _httpClient:HttpClient;
  BaseUrl:string=environment.URL_BE + "/api/auth";

  constructor(private http: HttpClient) { 
    this._httpClient=http;
  }


  public login(userName:string,password:string){
    
    this._httpClient.post(this.BaseUrl + "/login", {
      email:userName,
      password:password
    }).subscribe(res=>console.log(res))
  }
}
