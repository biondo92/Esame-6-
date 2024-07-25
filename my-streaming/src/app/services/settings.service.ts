import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Setting } from '../models/Setting';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _baseUrl: string = environment.URL_BE + "/api/settings"

  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(): Promise<Setting[]> {
    return new Promise((resolve, obj) => {
      this.http.get(this._baseUrl, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<Setting[]>).data!))
    })

  }
}
