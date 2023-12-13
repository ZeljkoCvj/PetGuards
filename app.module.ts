import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SingupComponent } from './component/auth/singup/singup.component';
import { HeaderComponent } from './component/header/header/header.component';
import { MyaccountComponent } from './component/myaccount/myaccount.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, LoginComponent, SingupComponent, HeaderComponent, MyaccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
