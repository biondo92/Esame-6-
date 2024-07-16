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
    return new Promise((resolve,obj)=>{
      this.http.get(this._baseUrl,{
        headers:{
          "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjExNTcyNzAsImV4cCI6MTcyMTE2MDg3MCwibmJmIjoxNzIxMTU3MjcwLCJqdGkiOiJiWjllVlRsUXhzdHZUMmsyIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjoxfQ.4WFwUm-DM2eJk9rxDg1ymuBieUrPQ0fo4z9rlu8U7Ys"
        }
      })
      .subscribe(res => resolve((res as ApiResponse<Category[]>).data!))
    })
    
  }
}
