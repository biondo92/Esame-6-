import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  protected user?: User
  /**
   *
   */
  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }

}
