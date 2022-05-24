import {Injectable} from '@angular/core';
import {Credentials} from "../interfaces/credentials";
import {HttpClient} from "@angular/common/http";
import {TokensPair} from "../interfaces/tokens-pair";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageNames} from "../enums/local-storage-names";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiURL;
  isLogged: boolean = false;

  constructor(private http: HttpClient,
              private localStore: LocalStorageService) {
  }

  login(credentials: Credentials) {
    let response = this.http.post<TokensPair>(`${this.apiUrl}/login`, credentials)
    response.subscribe(data => {
      if (data.token && data.refreshToken) {
        this.saveTokens(data);
      }
    })
    return response
  }

  signUp(user: any) {
    this.http.post(`${this.apiUrl}/api/auth/sign-up`, user)
      .subscribe(response => {
        console.log(response);
      })
  }

  me() {
    this.http.get(`${this.apiUrl}/api/auth/me`, {responseType: 'text'})
      .subscribe(username => {
        if (username != null) {
          console.log(username);
          this.isLogged = true;
        }
      })
  }

  getToken() {
    return this.localStore.get(LocalStorageNames.TOKEN);
  }

  getRefreshToken() {
    return this.localStore.get(LocalStorageNames.REFRESH_TOKEN);
  }

  saveTokens(tokens: TokensPair) {
    this.localStore.save(LocalStorageNames.TOKEN, tokens.token);
    this.localStore.save(LocalStorageNames.REFRESH_TOKEN, tokens.refreshToken);
  }

  refreshToken(): Observable<TokensPair> {
    console.log('reftoken', this.getRefreshToken())
    if (!!this.getRefreshToken()) {
      return this.http.post<TokensPair>(`${this.apiUrl}/api/auth/refresh`, this.getRefreshToken());
    }
    return new Subject<TokensPair>();
  }
}
