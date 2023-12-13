import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SingupComponent } from './component/auth/singup/singup.component';
import { MyaccountComponent } from './component/myaccount/myaccount.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'singup',
    component: SingupComponent,
  },
  {
    path: 'myaccount',
    component: MyaccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
