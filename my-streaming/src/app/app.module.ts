import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { AppMainComponent } from './components/app-main/app-main.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppSidebarBrandComponent } from './components/app-sidebar-brand/app-sidebar-brand.component';
import { AppContentHeaderComponent } from './components/app-content-header/app-content-header.component';
import { AppContentComponent } from './components/app-content/app-content.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppMainComponent,
    AppFooterComponent,
    AppSidebarBrandComponent,
    AppContentHeaderComponent,
    AppContentComponent,
    LoginComponent,
    ProfileComponent
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
