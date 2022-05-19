import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  registerForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  })

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    this.authService.signUp(this.registerForm.value);
  }

}
