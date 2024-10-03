import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Season } from '../models/Season';
import { ApiResponse } from '../models/ApiResponse';
import { Serie } from '../models/Serie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private _baseUrl: string = environment.URL_BE + "/api/seasons"

  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(): Promise<Season[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Season[]>).data!))
    })
  }

  public getSeries(): Promise<Serie[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("seasons", "series")
      this.http.get(url, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Serie[]>).data!))
    })

  }

  public getSerie(id: number): Promise<Serie[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("seasons", "series")
      this.http.get(url + "/" + id, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Serie[]>).data!))
    })

  }

  public add(model: Season): Promise<Season> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/add", model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Season>).data!))
    })
  }

  public update(model: Season): Promise<Season> {
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
