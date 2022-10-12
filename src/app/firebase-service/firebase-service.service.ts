import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  // [x: string]: any;
  // isLoggedIn = false;
  // constructor(public firebaseAuth: AngularFireAuth) {}
  // async signin(email: string, password: string) {
  //   await this.firebaseAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       this.isLoggedIn = true;
  //       localStorage.setItem('user', JSON.stringify(res.user));
  //     });
  // }
  // async signup(email: string, password: string) {
  //   await this.firebaseAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       this.isLoggedIn = true;
  //       localStorage.setItem('user', JSON.stringify(res.user));
  //     });
  // }
  // async add(bookName: string, authorName: string, bookId: any, imageUrl: any) {}
  // logout() {
  //   this.firebaseAuth.signOut();
  //   localStorage.removeItem('user');
  // }
}
