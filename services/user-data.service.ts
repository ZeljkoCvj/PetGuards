import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { user } from "../interface/user";
@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private http: HttpClient, private AuthService: AuthService) {}

  postData(name: string, surname: string, hoby: string, aboutYourself: string) {
    const userId = this.AuthService.getUserId();
    const user = {
      name: name,
      surname: surname,
      hoby: hoby,
      aboutYourself: aboutYourself,
      userId,
    };

    this.http
      .post(
        `https://petsstuff-5f9e1-default-rtdb.europe-west1.firebasedatabase.app/account${userId}.json`,
        user
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchData() {
    const userId = this.AuthService.getUserId();
    return this.http
      .get(
        `https://petsstuff-5f9e1-default-rtdb.europe-west1.firebasedatabase.app/account${userId}.json`
      )
      .pipe(
        map((result) => {
          return result ? Object.values(result) : [];
        })
      );
  }
  updateData(
    name: string,
    surname: string,
    hoby: string,
    aboutYourself: string
  ) {
    const userId = this.AuthService.getUserId();

    // Prvo dohvati trenutne podatke
    this.fetchData().subscribe((currentData: user[]) => {
      // Pronađi indeks korisnika u nizu
      const userIndex = currentData.findIndex((user) => user.userId === userId);

      // Ako korisnik nije pronađen, nešto je pošlo po zlu
      if (userIndex === -1) {
        console.error("Korisnik nije pronađen");
        return;
      }

      // Ako je korisnik pronađen, ažuriraj njegove podatke
      currentData[userIndex] = {
        name: name,
        surname: surname,
        hoby: hoby,
        aboutYourself: aboutYourself,
        userId: userId,
      };

      // Zatim pošalji ceo niz sa ažuriranim podacima
      this.http
        .put(
          `https://petsstuff-5f9e1-default-rtdb.europe-west1.firebasedatabase.app/account${userId}.json`,
          currentData
        )
        .subscribe((res) => {
          console.log(res);
          this.fetchData();
        });
    });
  }
  delateData(id: string) {
    this.http
      .delete(
        `https://petsstuff-5f9e1-default-rtdb.europe-west1.firebasedatabase.app/account${id}.json`
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
