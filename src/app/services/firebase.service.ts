import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { DexieService } from 'src/db/dexie.service';
import { liveQuery } from 'dexie';
import { from, map, tap } from 'rxjs';
import { ddb } from 'src/db/db';
import { Router } from '@angular/router';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getLocaleId } from '@angular/common';
// import { ConsoleReporter } from 'jasmine';
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

  // Add book to db

  add(obj: any) {
    return this.ds.addBook(obj);
  }

  // Get books from db
  getBooks() {
    return this.ds.getBooks();
  }

  getUsers() {
    return this.getAllUser();
  }
  // Get all books stored in dexie if not available in dexie call db

  getAllBooks() {
    return from(
      liveQuery(async () => {
        const books = await ddb.renderedBook.toArray();
        if (books.length === 0) {
          return await this.ds.getBooks();
        }
        return await ddb.renderedBook.toArray();
      })
    );
  }

  // Get seleted book using bookId

  getSelectedBook(keyId: any) {
    return from(
      liveQuery(async () => {
        const books = await ddb.renderedBook.toArray();
        return books.filter((v: any) => {
          if (v.keyId === keyId) {
            return v;
          }
        });
      })
    );
  }

  // Get particular author's book using author name

  getAuthorsBook(authorName: any, bookName: any) {
    return from(
      liveQuery(async () => {
        const books = await ddb.renderedBook.toArray();
        return books.filter((v: any) => {
          if (v.authorName === authorName) {
            return v;
          }
        });
      })
    );
  }

  // Changing availablility status of the book

  updatingBookInfo(id: any) {
    return this.ds.updateBook(id);
  }

  // Get already voted books for user

  getVotedBooks(email: any) {
    return from(
      liveQuery(async () => {
        const userData = await ddb.usersData.toArray();
        if (userData) {
          const getUserId = userData.filter((user: any) => {
            if (user.email === email) {
              return user;
            }
          });
          const alreadyVotedBooks = getUserId.map((voted: any) => {
            return voted.votedBooks;
          });
          return alreadyVotedBooks.map((v) => {
            return v;
          });
        }
      })
    );
  }

  // Get user Id with email

  getUserIdWithEmail(email: any) {
    return from(
      liveQuery(async () => {
        const userData = await ddb.usersData.toArray();

        const getUserId = userData.filter((user: any) => {
          if (user.email === email) {
            return user;
          }
        });
        const userId = getUserId.map((id: any) => {
          return id.userId;
        });
        return userId;
      })
    );
  }

  // Updating user with votedbooks

  async vote(book: any, email: any) {
    let votedBookArr: any;
    let id: any[] = [];
    const data = this.getVotedBooks(email).subscribe((v: any) => {
      v?.map((y: any) => {
        votedBookArr = y;
        votedBookArr;
      });
      data.unsubscribe();
    });
    const item = this.getUserIdWithEmail(email).subscribe((v: any) => {
      v.map((z: any) => {
        id.push(z);
        this.ds.addVote(book, z, votedBookArr);
      });
      item.unsubscribe();
    });
  }

  // Adding user to the db

  addUser(user: any) {
    return this.ds.addUserToDb(user);
  }

  // Get all users stored in dexie if not available in dexie call db

  getAllUser() {
    return from(
      liveQuery(async () => {
        const users = await ddb.usersData.toArray();
        if (users.length === 0) {
          await this.ds.getUsers();
          return await ddb.usersData.toArray();
        }
        return await ddb.usersData.toArray();
      })
    );
  }

  // Get user data from dexie

  getUsersDataFromDexie() {
    return from(
      liveQuery(async () => {
        return await ddb.usersData.toArray();
      })
    );
  }

  // Upading book taken info

  bookTaken(takenData: any) {
    return this.ds.takenBook(takenData);
  }

  // Making book available for users

  makeItAvailable(item: any, userId: any) {
    const bookId = item.bookInfo.keyId;
    return this.ds.makeBookAvailable(bookId, userId);
  }

  // Logging out the user

  logoutUser() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    localStorage.removeItem('lms-token');
  }
}
