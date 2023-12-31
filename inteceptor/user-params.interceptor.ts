import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthDataInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifyRequest = request.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifyRequest);
      })
    );
  }
}
