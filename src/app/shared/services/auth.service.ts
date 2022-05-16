import {Injectable} from '@angular/core';
import {Credentials} from "../interfaces/credentials";
import {HttpClient} from "@angular/common/http";
import {TokensPair} from "../interfaces/tokens-pair";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageNames} from "../enums/local-storage-names";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private localStore: LocalStorageService) { }

  login(credentials: Credentials){
    this.http.post<TokensPair>('http://localhost:8080/login', credentials)
      .subscribe(data => {
        this.localStore.save(LocalStorageNames.TOKEN, data.token);
        this.localStore.save(LocalStorageNames.REFRESH_TOKEN, data.refreshToken);
      })
  }
  getToken(){
    return this.localStore.get(LocalStorageNames.TOKEN);
  }
  getRefreshToken(){
    return this.localStore.get(LocalStorageNames.REFRESH_TOKEN);
  }
}
