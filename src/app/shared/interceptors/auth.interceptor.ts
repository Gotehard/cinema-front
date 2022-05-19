import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request))
      .pipe(
        tap({
            next: event => {
              if (event instanceof HttpResponse) {
                console.log('resp');
              } else {
                console.log('nie resp')
              }
            },
            error: err => {
              if (err.status == 401) {
                this.handle401Error(request, next);
              }
            }
          }
        )
      )
  }

  //todo Trzeba zrobić tak żeby po złapaniu 401 ponowiło zapytanie z dołączonym już nowym tokenem
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.authService.refreshToken()
      .subscribe(data => {
        if (data.token && data.refreshToken) {
          this.authService.saveTokens(data);
        }
        // return next.handle(this.addAuthToken(request));
      })
  }


  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();

    console.log('TOKEN', token)
    if (!!token) {
      console.info('reqEST')
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    console.warn('reqEST')
    return request;
  }
}
