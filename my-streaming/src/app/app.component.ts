import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-streaming';

  /**
   *
   */
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   this.auth.login("admin@gmail.com","password")
  }
}
