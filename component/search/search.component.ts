import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  filteredUsers: any[] = [];
  inputStr = "";
  private apiUrl = "http://localhost:3000/api/korisnici";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dobaviKorisnike().subscribe((res) => {
      this.searchResults = res;
      this.filteredUsers = [...this.searchResults];
    });
  }

  inputField() {
    const inputValue = this.inputStr.toLowerCase().trim();
    if (inputValue) {
      this.filteredUsers = this.searchResults.filter((user) => {
        return user.email && user.email.toLowerCase().includes(inputValue);
      });
    } else {
      this.filteredUsers = [...this.searchResults];
    }
  }

  dobaviKorisnike(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
