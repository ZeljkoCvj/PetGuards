import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { UserDataService } from "../services/user-data.service";

@Injectable()
export class Resolvere implements Resolve<any[]> {
  constructor(private userService: UserDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    return this.userService.fetchData();
  }
}
