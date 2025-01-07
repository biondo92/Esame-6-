import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() protected username: string = ""
  @Input() protected password: string = ""

  /**
   *
   */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }


//intercetta l evento submit del form, cambia la grafica inserendo un loader e chiama l API  di autenticazione 
//infine fa il redirect dell utente loggato verso la pagina catalog
  async onSubmit(): Promise<void> {
    var con = document.querySelector("#form-container")
    var mex = document.querySelector("#mex")
    mex!.innerHTML = "accesso in corso....."
    con!.innerHTML = "<i class='fas fa-sync fa-spin fa-3x m-auto' />"
    con!.classList.add("d-flex")
    this.auth.login(this.username, this.password)
      .then(() => this.router.navigate(["/catalog"]))
  }
}
