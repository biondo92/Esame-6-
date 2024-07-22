import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/Role';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _baseUrl: string = environment.URL_BE + "/api/roles"

  
  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(): Promise<Role[]> {
    return new Promise((resolve, obj)=>{
      this.http.get(this._baseUrl,{
        headers:{
          "Authorization":"Bearer " + this.auth.getToken()
        }
      })
      .subscribe(res => resolve((res as ApiResponse<Role[]>).data!))
    })
    
  }
}
