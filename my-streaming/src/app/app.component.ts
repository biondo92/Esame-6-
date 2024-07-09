import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

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
  constructor(private auth: AuthServiceService) {
    
  }
  ngOnInit(): void {
   this.auth.login("admin@gmail.com","password")
  }
}
