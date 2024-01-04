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
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MyaccountComponent } from "./component/myaccount/myaccount.component";
import { AuthDataInterceptor } from "./inteceptor/user-params.interceptor";
import { environment } from "./envuroment/enviroment";
import { Resolvere } from "./guards/fetchdata.resolver";
import { EditUserComponent } from "./component/myaccount/edit-user/edit-user.component";
import { SearchComponent } from './component/search/search.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SingupComponent,
    HeaderComponent,
    MyaccountComponent,
    EditUserComponent,
    SearchComponent,
    UserDetailComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFirestoreModule,

    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
