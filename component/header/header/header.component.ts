import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSub!: Subscription;

  constructor(private auth: AuthService) {}

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
