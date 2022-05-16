import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AuthFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
