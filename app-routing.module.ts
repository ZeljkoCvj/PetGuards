import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { SingupComponent } from "./component/auth/singup/singup.component";
import { MyaccountComponent } from "./component/myaccount/myaccount.component";
// import { ProfileComponent } from "./component/profile/profile.component";
import { Resolvere } from "./guards/fetchdata.resolver";
import { EditUserComponent } from "./component/myaccount/edit-user/edit-user.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "singup",
    component: SingupComponent,
  },
  {
    path: "myaccount",
    component: MyaccountComponent,
    resolve: { status: Resolvere },
  },
  {
    path: "editUser",
    component: EditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
