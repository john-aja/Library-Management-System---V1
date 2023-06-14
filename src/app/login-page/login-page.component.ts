import { Component, OnInit } from '@angular/core';
import { LoginPageService } from './login-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  userInfo: any;
  isLoggedin?: boolean;
  constructor(private ls: LoginPageService, private router: Router) {}

  ngOnInit(): void {}

  signInWithGoogle() {
    return this.ls.isLoggedIn();
  }
}
