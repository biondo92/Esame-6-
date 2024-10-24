import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  public user!: User
  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated()
  };
  public isInRole(role: string): boolean {
    return this.auth.isInRole(role)
  };

  public logout(): void {
    this.auth.logout()
    this.Navigate('/')
  }

  public Navigate(url: string): void {
    window.location.href = url
  }

  /**
   *
   */
  constructor(private auth: AuthService, protected router: Router) {
    this.user = this.auth.getUser()
  }
}
