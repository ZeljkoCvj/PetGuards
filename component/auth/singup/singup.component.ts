import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { authData } from "../../../interface/auth.data";

@Component({
  selector: "app-singup",
  templateUrl: "./singup.component.html",
  styleUrls: ["./singup.component.scss"], // Ispravljena greška u imenu propertija
})
export class SingupComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private AuthService: AuthService) {}
  OnSubmit(form: any): void {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const surrname = form.value.surrname;
    this.AuthService.singup(email, password);
    this.form.reset();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),

      checkbox: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
