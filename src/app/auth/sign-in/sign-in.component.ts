import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  login = 'q';
  password = 'q2we';
  constructor(
    private authService: AuthService
  ) { }

  signIn(){
    if (!this.login && !this.password){
      return
    }
    this.authService.login({
      username: this.login,
      password: this.password
    })
  }

}
