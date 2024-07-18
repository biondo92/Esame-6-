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

  async onSubmit(): Promise<void>{
    this.auth.login(this.username, this.password)
    .then(() => this.router.navigate(["/"]))
  }
}
