import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Serie } from '../models/Serie';
import { ApiResponse } from '../models/ApiResponse';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {


  private _baseUrl: string = environment.URL_BE + "/api/series"


  constructor(private auth: AuthService, private http: HttpClient) { }


  public getList(): Promise<Serie[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Serie[]>).data!))
    })
  }


  public getCategories(): Promise<Category[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("series", "categories")
      this.http.get(url, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Category[]>).data!))
    })

  }

  public getCategory(id: number): Promise<Category[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("series", "categories")
      this.http.get(url + "/" + id, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Category[]>).data!))
    })

  }
}
