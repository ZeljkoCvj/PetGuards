import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FirebaseService } from "./services/firebase.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
