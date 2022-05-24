import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class InitialConfigService {

  constructor(private authService: AuthService) {
  }

  init() {
    console.info('init service XD');
    this.authService.me();
  }
}
