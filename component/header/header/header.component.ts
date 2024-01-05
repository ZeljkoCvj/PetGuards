import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";
import { UserDataService } from "../../../services/user-data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  show = false;
  private userSub!: Subscription;

  constructor(
    private auth: AuthService,
    private dataService: UserDataService
  ) {}

  logOut() {
    this.auth.logout();
  }
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((auth) => {
      this.isLoggedIn = !auth ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
