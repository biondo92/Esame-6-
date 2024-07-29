import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string = environment.URL_BE + "/api/users"


  constructor(private auth: AuthService, private http: HttpClient) { }

  public update(user: User): Promise<boolean> {
    return new Promise((resolve, obj) => {
      this.http.put(this._baseUrl + "/" + user.id, user, {
        headers: {
          "Authorization": "Bearer " + this.auth.getToken()
        }
      })
        .subscribe(res => resolve((res as ApiResponse<User[]>).status === "Ok"))
    })
  }
}
