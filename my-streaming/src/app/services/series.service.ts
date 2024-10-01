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

  public add(model: Serie): Promise<Serie> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/add", model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Serie>).data!))
    })
  }

  public update(model: Serie): Promise<Serie> {
    return new Promise((resolve, obj) => {
      this.http.put(this._baseUrl + "/" + model.id, model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Serie>).data!))
    })
  }
  public delete(id: number): Promise<boolean> {
    return new Promise((resolve, obj) => {
      this.http.delete(this._baseUrl + "/" + id, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve(true))
    })
  }


}
