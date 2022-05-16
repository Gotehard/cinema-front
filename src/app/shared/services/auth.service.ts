import {Injectable} from '@angular/core';
import {Credentials} from "../interfaces/credentials";
import {HttpClient} from "@angular/common/http";
import {TokensPair} from "../interfaces/tokens-pair";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageNames} from "../enums/local-storage-names";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiURL;

  constructor(private http: HttpClient,
              private localStore: LocalStorageService) { }

  login(credentials: Credentials){
    this.http.post<TokensPair>(`${this.apiUrl}/login`, credentials)
      .subscribe(data => {
        this.localStore.save(LocalStorageNames.TOKEN, data.token);
        this.localStore.save(LocalStorageNames.REFRESH_TOKEN, data.refreshToken);
      })
  }

  signUp(user: any){
    this.http.post(`${this.apiUrl}/api/auth/sign-up`, user)
      .subscribe(response => {
        console.log(response);
      })
  }

  getToken(){
    return this.localStore.get(LocalStorageNames.TOKEN);
  }
  getRefreshToken(){
    return this.localStore.get(LocalStorageNames.REFRESH_TOKEN);
  }
}
