import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../../../services/user-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrl: "./edit-user.component.scss",
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  data: any;
  constructor(private userData: UserDataService, private router: Router) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surrname: new FormControl(null, Validators.required),
      hobby: new FormControl(null),
      ayourself: new FormControl(null, Validators.required),
    });
  }
  onSubmit(userForm: any) {
    const namee = userForm.name;
    const surrname = userForm.surrname;
    const hobby = userForm.hobby;
    const ayourself = userForm.ayourself;

    this.userData.updateData(namee, surrname, hobby, ayourself);
    this.userForm.reset();
    this.router.navigate(["/myaccount"]);
  }
}
