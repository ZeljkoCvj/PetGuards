import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { UserDataService } from "../../services/user-data.service";
import { user } from "../../interface/user";

@Component({
  selector: "app-myaccount",
  templateUrl: "./myaccount.component.html",
  styleUrls: ["./myaccount.component.scss"],
})
export class MyaccountComponent implements OnInit {
  data: user[] = [];
  exist: boolean;
  userForm: FormGroup;
  name: string;

  constructor(
    private authS: AuthService,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((userInfo) => {
      this.data = userInfo["status"];
      this.exist = this.data.length > 0;
    });
  }

  deleteUser(id: string) {
    this.authS.deleteUser();
    this.userData.delateData(id);
  }

  editUser() {
    this.router.navigate(["/editUser"]);
  }
}
