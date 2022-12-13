import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  listChanges,
} from '@angular/fire/compat/database';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { DexieService } from 'src/db/dexie.service';
import { liveQuery } from 'dexie';
import { from, map } from 'rxjs';
import { ddb } from 'src/db/db';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  item: any;
  constructor(
    public db: AngularFireDatabase,
    public ds: DexieService,
    private router: Router
  ) {}

  add(obj: any) {
    return this.ds.addBook(obj);
  }
  getBooks() {
    return this.ds.getBooks();
  }

  getAllBooks() {
    return from(liveQuery(async () => await ddb.renderedBook.toArray()));
  }

  updatingBookInfo(id: any) {
    return this.ds.updateBook(id);
  }
  vote(v: any) {
    console.log(v);
    return this.ds.addVote(v);
  }
  addUser(user: any) {
    return this.ds.addUserToDb(user);
  }

  getAllUser() {
    return this.ds.getUsers();
  }

  getUsersDataFromDexie() {
    return from(liveQuery(async () => await ddb.usersData.toArray()));
  }

  bookTaken(takenData: any) {
    console.log('from firebase service!');
    return this.ds.takenBook(takenData);
  }

  makeItAvailable(item: any, userId: any) {
    const bookId = item.bookInfo.keyId;
    return this.ds.makeBookAvailable(bookId, userId);
  }

  logoutUser() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    localStorage.removeItem('lms-token');
  }
}
