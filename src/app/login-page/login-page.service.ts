import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { FirebaseService } from '../services/firebase.service';

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  decodedToken: any | null = null;
  token: any;
  userEmail: any;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private fs: FirebaseService
  ) {}

  async isLoggedIn() {
    google.accounts.id.initialize({
      client_id:
        '1086641789904-vlo22kcc17fpp525odo4bo4e3ghae5l4.apps.googleusercontent.com',
      callback: (token: CredentialResponse) => {
        this.signin(token.credential, token);
        this.ngZone.run(() => {
          this.signin(token.credential, token);
        });
      },
      ux_mode: 'popup',
      prompt: 'select_account',
    });
    google.accounts.id.prompt();
  }

  signin(token: any, response: CredentialResponse) {
    let decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken) {
      this.router.navigateByUrl('');
    }
    let userInfo: any = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    this.userEmail = decodedToken.email;
    this.fs.addUser(userInfo);
    localStorage.setItem('user', JSON.stringify(decodedToken));
    JSON.stringify(localStorage.setItem('lms-token', token));
  }
}
