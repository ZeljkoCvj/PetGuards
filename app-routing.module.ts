import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { SingupComponent } from "./component/auth/singup/singup.component";
import { MyaccountComponent } from "./component/myaccount/myaccount.component";

import { Resolvere } from "./guards/fetchdata.resolver";
import { EditUserComponent } from "./component/myaccount/edit-user/edit-user.component";
import { SearchComponent } from "./component/search/search.component";
import { UserDetailComponent } from "./component/user-detail/user-detail.component";
import { canActivGuard } from "./guards/can-activ.guard";

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
    path: "search",
    component: SearchComponent,
    canActivate: [canActivGuard],
  },
  {
    path: "user-details/:uid",
    component: UserDetailComponent,
    canActivate: [canActivGuard],
  },
  {
    path: "myaccount",
    component: MyaccountComponent,
    resolve: { status: Resolvere },
    canActivate: [canActivGuard],
  },
  {
    path: "editUser",
    component: EditUserComponent,
    resolve: { status: Resolvere },
    canActivate: [canActivGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
