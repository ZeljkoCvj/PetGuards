import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../../../services/user-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseService } from "../../../services/firebase.service";
import { userAuth } from "../../../interface/authUsr";
import { user } from "../../../interface/user";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  names: string;
  data: user[] = [];
  exist: boolean;

  constructor(
    private userData: UserDataService,
    private router: Router,
    private fireBase: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((userInfo) => {
      this.data = userInfo["status"];
      this.exist = this.data.length > 0;
    });

    this.fireBase.getUser().subscribe((res: userAuth[]) => {
      if (res.length > 0) {
        this.names = res[0].displayName;
      }

      // Postavljanje inicijalne vrijednosti polja 'name'
      let nameValue = this.names;

      // Provjera i postavljanje samo ako su svi i.name prazni
      if (this.data.every((i) => i.name === "")) {
        nameValue = this.names;
      } else if (this.data[0].name !== "") {
        nameValue = this.data[0].name;
      }

      // Konačno postavljanje vrijednosti polja 'name'
      this.userForm.patchValue({
        name: nameValue,
        surrname: this.data[0]?.surname,
        hobby: this.data[0]?.hoby,
        ayourself: this.data[0]?.aboutYourself,
      });
    });

    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surrname: new FormControl(null, Validators.required),
      hobby: new FormControl(null),
      ayourself: new FormControl(null, Validators.required),
    });
  }

  onSubmit(userForm: user) {
    const namee = userForm.name;
    const surrname = userForm.surname;
    const hobby = userForm.hoby;
    const ayourself = userForm.ayourself;

    if (this.exist) {
      this.userData.updateData(namee, surrname, hobby, ayourself);
      this.userForm.reset();
      setTimeout(() => {
        this.router.navigate(["/myaccount"]);
      }, 500);
    } else {
      this.userData.postData(namee, surrname, hobby, ayourself);
      this.userForm.reset();
      setTimeout(() => {
        this.router.navigate(["/myaccount"]);
      }, 500);
    }
  }
}
