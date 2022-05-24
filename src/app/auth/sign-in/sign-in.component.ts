import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm = new FormGroup({
    username: new FormControl('q'),
    password: new FormControl('q2we')
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value)
      .pipe(
        first()
      )
      .subscribe(d => {
        if (d.token && d.refreshToken) {
          this.router.navigate(['/'])
        }
      })

  }

  ref() {
    this.authService.refreshToken();
  }

}
