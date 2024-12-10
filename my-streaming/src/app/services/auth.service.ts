import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.URL_BE + "/api/auth";
  private token?: string
  private user?: User

  constructor(private http: HttpClient) {
    //tenta di recuperare lo stato attuale del login
    let json = localStorage.getItem("LoginStatus")
    if (json !== null && json !== undefined) {
      //se trova un login status lo deserializza in un oggetto e lo salva in memoria
      let status = (JSON.parse(json) as LoginStatus)
      this.token = status.token
      this.user = status.user
    }
  }

  //restituisce un flag che indica se l utente è loggato
  public isAuthenticated(): boolean {
    let json = localStorage.getItem("LoginStatus")
    if (json !== null && json !== undefined) {
      let status = (JSON.parse(json) as LoginStatus)
      this.token = status.token
      this.user = status.user
    }
    return this.user !== null && this.user !== undefined
  }

//restituisce un flag che indica se l utente corrente appartiene al ruolo specificato
  public isInRole(role: string): boolean {
    let json = localStorage.getItem("LoginStatus")
    if (json !== null && json !== undefined) {
      let status = (JSON.parse(json) as LoginStatus)
      this.token = status.token
      this.user = status.user
    }
    return this.user !== null && this.user !== undefined && this.user.role?.description == role
  }

// restituisce l utente attualmente loggato se ce ne uno
  public getUser(): User {
    let json = localStorage.getItem("LoginStatus")
    if (json !== null && json !== undefined) {
      let status = (JSON.parse(json) as LoginStatus)
      this.token = status.token
      this.user = status.user
    }
    return this.user!
  }

  //consente la registrazione spontanea dell utente e , nel caso di successo effettua il login con l utente appena creato
  public async register(model: User, password: string): Promise<void> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/register", {
        email: model.email,
        password: password,
        name: model.name,
        lastName: model.lastName
      }).subscribe(res => {
        this.login(model.email!, password)
        resolve()
      })
    })

  }
  // restituisce il token dell utente loggato
  public getToken(): string {
    let json = localStorage.getItem("LoginStatus")
    if (json !== null && json !== undefined) {
      let status = (JSON.parse(json) as LoginStatus)
      this.token = status.token
      this.user = status.user
    }
    return this.token!
  }

  //questa funzione effettua diverse chiamate durante il processo di autenticazione
  //1- chiama la action /get-salt passando l email dell utente che sta tentando di accedere
  //2- se l utente esiste viene restituito il salt della password, che verra utilizzato per criptare la password cosi da non trasmetterla in chiaro
  //3- se il login va a buon fine recupera le info dell utente appena loggato ed infine salva lo stato del login nel local storage
  
  public async login(userName: string, password: string): Promise<void> {
    return new Promise((resolve, obj) => {
      this.http.post(this._baseUrl + "/get-salt", {
        email: userName
      })
        .subscribe(res => {

          var salt = (res as any).data;
          var cripted = sha256(password + salt)

          this.http.post(this._baseUrl + "/login", {
            email: userName,
            password: cripted
          }).subscribe(resp => {

            this.token = (resp as any).access_token;

            this.http.get(this._baseUrl + "/me", {
              headers: {
                "Authorization": "Bearer " + this.token
              }
            })
              .subscribe(res => {
                this.user = (res as ApiResponse<User>).data
                this.user!.fullname = this.user?.name + " " + this.user?.lastName

                let status = new LoginStatus(this.token!, this.user!)
                localStorage.setItem("LoginStatus", JSON.stringify(status))

                resolve()
              })
          })

        })
    })
  }

  //effettua il logout dell utente loggato e pulisce lo stato del login nel local storage
  public async logout(): Promise<void> {
    return new Promise((resolve, obj) => {
      try {
        this.http.get(this._baseUrl + "/logout", {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        })
          .subscribe(res => {
            this.user = undefined
            this.token = undefined
            resolve()
          })
      }
      catch (e) {

      }
      finally {
        this.user = undefined
        this.token = undefined
        localStorage.removeItem("LoginStatus")
      }
    })
  }
}

class LoginStatus {
  public token!: string
  public user!: User

  /**
   *
   */
  constructor(token: string, user: User) {
    this.token = token
    this.user = user
  }
}

//un guard utilizzato per proteggere le pagine che richiedono autenticazione
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const isLogged = inject(AuthService).isAuthenticated();
  return isLogged
}