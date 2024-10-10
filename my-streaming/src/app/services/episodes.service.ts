import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Episode } from '../models/Episode';
import { ApiResponse } from '../models/ApiResponse';
import { Season } from '../models/Season';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private _baseUrl: string = environment.URL_BE + "/api/episodes"


  constructor(private auth: AuthService, private http: HttpClient) { }



  public getList(): Promise<Episode[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Episode[]>).data!))
    })
  }

  public getSeasons(): Promise<Season[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("episodes", "seasons")
      this.http.get(url, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Season[]>).data!))
    })

  }

  public getSeason(id: number): Promise<Season[]> {
    return new Promise((resolve, obj) => {
      let url = this._baseUrl.replace("episodes", "seasons")
      this.http.get(url + "/" + id, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Season[]>).data!))
    })

  }

  public add(model: Episode): Promise<Episode> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/add", model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Episode>).data!))
    })
  }

  public update(model: Episode): Promise<Episode> {
    return new Promise((resolve, obj) => {
      this.http.put(this._baseUrl + "/" + model.id, model, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Episode>).data!))
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
