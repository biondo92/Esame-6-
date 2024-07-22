import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/Address';
import { ApiResponse } from '../models/ApiResponse';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private _baseUrl: string = environment.URL_BE + "/api/addresses"


  constructor(private auth: AuthService, private http: HttpClient) { }

  public getList(userId?:number): Promise<Address[]> {
    return new Promise((resolve, obj)=>{
      let url= userId!==undefined?
        this._baseUrl + "?userId="+userId : // se vero
        this._baseUrl // se falso
      this.http.get(url,{
        headers:{
          "Authorization":"Bearer " + this.auth.getToken()
        }
      })
      .subscribe(res => resolve((res as ApiResponse<Address[]>).data!))
    })
    
  }

  public getCities(): Promise<City[]> {
    return new Promise((resolve, obj)=>{
      let url= this._baseUrl.replace("addresses","cities")
      this.http.get(url,{
        headers:{
          "Authorization":"Bearer " + this.auth.getToken()
        }
      })
      .subscribe(res => resolve((res as ApiResponse<City[]>).data!))
    })
    
  }

  public getCity(id:number): Promise<City[]> {
    return new Promise((resolve, obj)=>{
      let url= this._baseUrl.replace("addresses","cities")
      this.http.get(url+"/"+id,{
        headers:{
          "Authorization":"Bearer " + this.auth.getToken()
        }
      })
      .subscribe(res => resolve((res as ApiResponse<City[]>).data!))
    })
    
  }
}
