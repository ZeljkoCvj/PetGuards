import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FirebaseService } from "../../services/firebase.service";
import { user } from "../../interface/user";
import { userAuth } from "../../interface/authUsr";
import { authData } from "../../interface/auth.data";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrl: "./user-detail.component.scss",
})
export class UserDetailComponent implements OnInit {
  private api = `https://petsstuff-5f9e1-default-rtdb.europe-west1.firebasedatabase.app`;
  userData: authData;
  userExists: boolean = false;
  uid: string;
  user: user[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const storedUserData = localStorage.getItem("userAccount");
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
    this.uid = this.route.snapshot.paramMap.get("uid");
    this.http
      .get(`${this.api}/account${this.uid}.json`)
      .pipe(
        map((res) => {
          if (res) {
            return Object.values(res);
          }
          return [];
        })
      )
      .subscribe((userData) => {
        this.user = userData;
        for (let i of userData) {
          if (this.userData.id === i.userId) {
            this.userExists = true;
            break;
          }
        }
      });
  }
}
