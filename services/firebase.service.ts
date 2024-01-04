// firebase.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  private apiUrl = "http://localhost:3000/api/korisnici";

  constructor(private http: HttpClient) {}

  dobaviKorisnike(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
