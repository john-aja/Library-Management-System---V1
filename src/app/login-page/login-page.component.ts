import { Component, OnInit } from '@angular/core';
import { LoginPageService } from './login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private ls: LoginPageService) {}
  ngOnInit(): void {}

  isLoggedIn() {
    const res: any = this.ls.isLoggedIn();
    console.log(res);
    return res;
  }
}
