import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  decodedToken: any | null = null;
  token: any;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private fs: FirebaseService
  ) {}
  isLoggedIn() {
    // @ts-ignore
    google.accounts.id.initialize({
      // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
      client_id:
        '1062987206467-rs3f2p347c36t21k1a9rmvfjfb7qoahd.apps.googleusercontent.com',
      callback:
        // (this.handleCredentialResponse.bind(this),
        (token) => {
          this.signin(token.credential, token);
        },
      auto_select: true,
      cancel_on_tap_outside: false,
    });

    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {
      if (notification.getDismissedReason() === 'credential_returned') {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }
    });
  }

  // handleCredentialResponse(response: CredentialResponse) {
  //   let decodedToken: any | null = null;
  //   try {
  //     decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
  //     console.log(decodedToken);
  //     // this.router.navigate(['']);
  //   } catch (e) {
  //     console.error('Error while trying to decode token', e);
  //   }
  //   console.log('decodedToken', decodedToken);
  //   localStorage.setItem('token', decodedToken.jti);
  // }

  signin(token: any, response: CredentialResponse) {
    console.log(response);
    let decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log(decodedToken);
    let userInfo: any = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    this.fs.addUser(userInfo);
    localStorage.setItem('user', JSON.stringify(decodedToken));
    JSON.stringify(localStorage.setItem('lms-token', token));
  }
}
