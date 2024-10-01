import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Film } from '../models/Film';
import { ApiResponse } from '../models/ApiResponse';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private _baseUrl: string = environment.URL_BE + "/api/films"

  constructor(private auth: AuthService, private http: HttpClient) { }


  public getList(): Promise<Film[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Film[]>).data!))
    })
  }

  public add(model: Film): Promise<Film> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/add", model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Film>).data!))
    })
  }

  public update(model: Film): Promise<Film> {
    return new Promise((resolve, obj) => {
      this.http.put(this._baseUrl + "/" + model.id, model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Film>).data!))
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

