import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { SingupComponent } from "./component/auth/singup/singup.component";
import { HeaderComponent } from "./component/header/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule, ToastrService } from "ngx-toastr";
import { MyaccountComponent } from "./component/myaccount/myaccount.component";
import { AuthDataInterceptor } from "./inteceptor/user-params.interceptor";
// import { ProfileComponent } from "./component/profile/profile.component";
import { Resolvere } from "./guards/fetchdata.resolver";
import { EditUserComponent } from './component/myaccount/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SingupComponent,
    HeaderComponent,
    MyaccountComponent,
    EditUserComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService,
    Resolvere,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthDataInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
