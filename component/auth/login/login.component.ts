import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private auth: AuthService) {}
  OnSubmit(form: any) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.login(email, password);
    form.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      checkbox: new FormControl(null),
    });
  }
}
