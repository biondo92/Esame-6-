import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppSidebarBrandComponent } from './components/app-sidebar-brand/app-sidebar-brand.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RolesComponent } from './components/roles/roles.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { FilmsComponent } from './components/films/films.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppFooterComponent,
    AppSidebarBrandComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    RolesComponent,
    CitiesComponent,
    SettingsComponent,
    UsersComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
