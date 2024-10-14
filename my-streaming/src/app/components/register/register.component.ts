import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


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
