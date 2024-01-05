import { Component, OnInit } from "@angular/core";

import { FirebaseService } from "../../services/firebase.service";
import { userAuth } from "../../interface/authUsr";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchResults: userAuth[] = [];
  filteredUsers: userAuth[] = [];
  inputStr = "";

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.getUser().subscribe((res) => {
      this.searchResults = res;
      this.filteredUsers = [...this.searchResults];
    });
  }

  inputField() {
    const inputValue = this.inputStr.toLowerCase().trim();
    if (inputValue) {
      this.filteredUsers = this.searchResults.filter((user) => {
        return user?.displayName?.toLowerCase().includes(inputValue);
      });
    } else {
      this.filteredUsers = [...this.searchResults];
    }
  }
}
