import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _baseUrl: string = environment.URL_BE + "/api/categories"

  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(): Promise<Category[]> {
    return new Promise((resolve, obj)=>{
      this.http.get(this._baseUrl,{
        headers:{
          "Authorization":"Bearer " + this.auth.token
        }
      })
      .subscribe(res => resolve((res as ApiResponse<Category[]>).data!))
    })
    
  }
}
