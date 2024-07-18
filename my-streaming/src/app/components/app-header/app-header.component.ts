import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  public isAuthenticated(): boolean { 
    return this.auth.isAuthenticated() 
  };

  /**
   *
   */
  constructor(protected auth: AuthService) { }
}
