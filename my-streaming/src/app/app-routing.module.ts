import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    title: "Home",
    component: HomeComponent
  },
  {
    path: 'login',
    title: "Login",
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: "Profilo",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
