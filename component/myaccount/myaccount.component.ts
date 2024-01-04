import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../../services/user-data.service";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-myaccount",
  templateUrl: "./myaccount.component.html",
  styleUrl: "./myaccount.component.scss",
})
export class MyaccountComponent implements OnInit {
  data: any[] = [];
  exist: boolean;
  userForm: FormGroup;
  name: string;
  namee: string;
  constructor(
    private authS: AuthService,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(userForm: any) {
    const namee = userForm.name;
    const surrname = userForm.surrname;
    const hobby = userForm.hobby;
    const ayourself = userForm.ayourself;

    this.userData.postData(namee, surrname, hobby, ayourself);
    this.userForm.reset();
  }
  ngOnInit(): void {
    this.route.data.subscribe((userInfo) => {
      this.data = userInfo["status"];
      if (this.data.length === 0) {
        this.exist = false;
      } else {
        this.exist = true;
      }
    });

    this.authS.user.subscribe((res) => {
      if (res) {
        this.name = res.email;
      }
    });

    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surrname: new FormControl(null, Validators.required),
      hobby: new FormControl(null),
      ayourself: new FormControl(null, Validators.required),
    });
  }

  deleteUser() {
    this.authS.deleteUser();
  }

  editUser() {
    this.router.navigate(["/editUser"]);
  }
}
