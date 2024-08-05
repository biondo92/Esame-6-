import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/City';
import { ApiResponse } from '../models/ApiResponse';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {


  private _baseUrl: string = environment.URL_BE + "/api/cities"

  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(): Promise<City[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<City[]>).data!))
    })

  }

  public add(model: Role): Promise<Role> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/add", model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Role>).data!))
    })
  }

  public update(model: Role): Promise<Role> {
    return new Promise((resolve, obj) => {
      this.http.put(this._baseUrl + "/" + model.id, model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Role>).data!))
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
