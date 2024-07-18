import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {
  public isAuthenticated(): boolean { 
    return this.auth.isAuthenticated() 
  };
  public isAdmin(): boolean { 
    return this.auth.isAuthenticated() && true
  };
  // public isAdmin: boolean = this.isAuthenticated && true
  public isRenderingLoginPage: boolean = false
  /**
   *
   */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/login') {
          this.isRenderingLoginPage = true
        }
        else{
          this.isRenderingLoginPage = false
        }
      }
    });
  }
}
