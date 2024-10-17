import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  protected model?: User = new User

  protected Pass?: string = ""
  protected confPass?: string = ""

  /**
   *
   */
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  public async Register(): Promise<void> {
    this.auth.register(this.model!, this.Pass!).then(res => {
      alert("Registrazione effettuata con successo")
    })

  }

  async onSubmit(): Promise<void> {
    var con = document.querySelector("#form-container")
    var mex = document.querySelector("#mex")
    mex!.innerHTML = "registrazione in corso....."
    con!.innerHTML = "<i class='fas fa-sync fa-spin fa-3x m-auto' />"
    con!.classList.add("d-flex")
    // this.auth.login(this.username, this.password)
    //   .then(() => this.router.navigate(["/"]))
  }

}
