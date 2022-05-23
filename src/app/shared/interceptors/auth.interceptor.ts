import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, first, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing: boolean = false;

  constructor(private authService: AuthService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();
    let authReq = req;
    if (token != null) {
      authReq = this.addTokenHeader(authReq, token);
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == 401) {
          console.error('nie ma autoryzacji');
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refTokenSubject.next(null);
      const token = this.authService.getRefreshToken();
      if (token) {
        return this.authService.refreshToken()
          .pipe(
            switchMap(token => {
              this.isRefreshing = false;
              this.authService.saveTokens(token);
              this.refTokenSubject.next(token.token);

              return next.handle(this.addTokenHeader(req, token.token));
            }),
            catchError(err => {
              this.isRefreshing = false;
              //TODO signout
              console.warn('REF token nie działą')
              return throwError(err);
            })
          )
      }
    }
    return this.refTokenSubject.pipe(
      filter(token => token != null),
      first(),
      switchMap(token => next.handle(this.addTokenHeader(req, token)))
    )
  }

  addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
  }
}
