import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(b => {
      this.isLogged = b;
    })
  }

}
