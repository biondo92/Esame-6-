import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { Category } from './models/Category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-streaming';
  public isAuthenticated(): boolean { 
    return this.auth.isAuthenticated() 
  };
  isAdmin: boolean = true
  /**
   *
   */
  constructor(
    private router: Router,
    private auth: AuthService,
    private categories: CategoriesService
  ) { }

  data!:Category[]
  async ngOnInit(): Promise<void> {
    // this.auth.login("admin@gmail.com", "password")
    // this.data = await this.categories.getList()
    console.log({
      isAuthenticated: this.auth.isAuthenticated()
    })
  }
}
