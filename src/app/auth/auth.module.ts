import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {FormsModule} from "@angular/forms";
import {AuthFormComponent} from "./auth-form/auth-form.component";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    AuthFormComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
    ]
})
export class AuthModule { }
