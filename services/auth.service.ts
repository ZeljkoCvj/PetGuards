import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { authData } from "../interface/auth.data";
import { User } from "../modules/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private route: Router,
    private toastr: ToastrService
  ) {}

  singup(email: string, password: string, name?: string) {
    this.http
      .post<authData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLFtHtdWXBkZaIy8FmBJjyVUcXoGAOn1g",
        {
          email: email,
          password: password,
          displayName: name,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => this.handleError(error, this.toastr)),
        tap((resdata) => {
          this.handleAuth(
            resdata.email,
            resdata.localId,
            resdata.idToken,
            resdata.expiresIn
          );
        })
      )
      .subscribe((result) => {
        this.route.navigate(["/editUser"]);
        this.toastr.success("Success created account");
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<authData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLFtHtdWXBkZaIy8FmBJjyVUcXoGAOn1g",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => this.handleError(error, this.toastr)),
        tap((resdata) => {
          this.handleAuth(
            resdata.email,
            resdata.localId,
            resdata.idToken,
            resdata.expiresIn
          );
        })
      )
      .subscribe((result) => {
        this.route.navigate(["/myaccount"]);
      });
  }
  deleteUser() {
    const user = this.user.value;

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    this.http
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDLFtHtdWXBkZaIy8FmBJjyVUcXoGAOn1g",
        {
          idToken: user.token,
        }
      )

      .subscribe(() => {
        this.toastr.show("User success deleted");
        this.logout();
      });
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userAccount");
    this.route.navigate(["/login"]);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpireDate: string;
    } = JSON.parse(localStorage.getItem("userAccount"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpireDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
  getUserId() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpireDate: string;
    } = JSON.parse(localStorage.getItem("userAccount"));

    return userData.id ? userData.id : null;
  }
  private handleAuth(
    email: string,
    localId: string,
    token: string,
    expiriesIn: string
  ) {
    const expDate = new Date(new Date().getTime() + +expiriesIn * 1000);
    const user = new User(email, localId, token, expDate);

    this.user.next(user);
    localStorage.setItem("userAccount", JSON.stringify(user));
  }

  handleError(error: HttpErrorResponse, toastr: ToastrService) {
    let errorMessage = "Unknown error thrown";

    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email exist";
        toastr.error(errorMessage);
        break;

      case "EMAIL_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
        toastr.error(errorMessage);
        break;

      case "INVALID_PASSWORD":
        errorMessage =
          "The password is invalid or the user does not have a password.";
        toastr.error(errorMessage);
        break;

      case "USER_DISABLED":
        errorMessage =
          "The user account has been disabled by an administrator.";
        toastr.error(errorMessage);
        break;
    }

    return throwError(errorMessage);
  }
}
