import { Injectable } from '@angular/core';
import { ddb } from './db';
import { ref, onValue, getDatabase, update, Database } from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DexieService {
  bookList: any = [];
  usersList: any = [];
  userValues: any;
  bookTaken: any[];
  userId: any;
  db = getDatabase();
  constructor(public afd: AngularFireDatabase) {}

  // Put books data in dexie

  async getBooks() {
    const db = getDatabase();
    const bookInfo = ref(db, 'addedBooks/');
    onValue(bookInfo, (snapshot) => {
      let obj = [];
      const data = snapshot?.val();
      obj.push(data);

      this.bookList = data ? Object.values(data) : '';

      this.bookList.map(async (val: any) => {
        if (val)
          await ddb.renderedBook
            .put(val)
            .then((data) => console.log('Retrieved book from db'))
            .catch((err) => console.log(err));
      });
    });
  }

  // Update added books to dexie

  addBook(bookObj: any) {
    const id = 'id' + Math.random().toString(16).slice(8);
    this.afd
      .list('/addedBooks')
      .set(`${id}`, { ...bookObj, keyId: `${id}` })
      .then((v: any) => console.log('Added book to db'));

    ddb
      .table('bookData')
      .add({ ...bookObj })
      .then((data) => alert('Successfully added book to the library'))
      .catch((err) => console.log(err.message));
  }

  // Change availability status of the book and update in dexie

  async updateBook(id: any) {
    ddb.renderedBook.update(id, { availability: 'No' });
    const firebaseDb = this.afd.list('/addedBooks');
    try {
      await firebaseDb.update(id, { availability: 'No' });
      return alert('Successfully removed book from Surboard library');
    } catch (err) {
      return {
        err,
        errorMessage: 'something went wrong',
      };
    }
  }

  // Adding new user to dexie and firebase

  addUserToDb(userInfo: any) {
    const id = 'user_' + Math.random().toString(16).slice(8);
    const currentUser = { ...userInfo, userId: id };
    ddb.currentUser
      .add({ ...currentUser })
      .then((data) => console.log('Current user addded successfully to db'))
      .catch((err) => console.log(err.message));

    const userRef = ref(this.db, 'users/');
    onValue(userRef, (snapshot) => {
      const users = snapshot?.val();
      let usersList = Object.values(users);
      const userExists = usersList.find(
        (v: any) => v.email === currentUser.email
      );
      if (!userExists)
        this.afd.list('users/').set(currentUser.userId, { ...currentUser });
      else return;
    });
  }

  // Put users data in dexie

  async getUsers() {
    const db = getDatabase();
    const bookInfo = ref(db, 'users/');
    onValue(bookInfo, async (snapshot) => {
      let obj = [];
      const data = snapshot?.val();
      obj.push(data);

      this.usersList = data ? Object.values(data) : '';

      await this.usersList.map((val: any) => {
        if (val)
          ddb.usersData
            .put(val)
            .then((data) => console.log('Retrieved user from db'))
            .catch((err) => console.log(err));
      });
    });
  }

  // Updating book taken info

  async takenBook(data: any) {
    let userId: any;
    let bookTaken: any[] = [];
    const takenBookId = data.bookInfo.keyId;

    const userRef = ref(this.db, 'users/');
    const firebaseDbBooks = this.afd.list('/addedBooks');
    const firebaseDbUsers = this.afd.list('/users');

    bookTaken.push({ bookInfo: data.bookInfo, time: data.time });

    onValue(userRef, async (snapshot) => {
      const users = snapshot?.val();
      let usersList = Object.values(users);

      usersList.filter((v: any) => {
        if (v.email === data.userEmail) {
          return v.booksTaken?.map((s: any) => {
            return bookTaken.push(s);
          });
        }
      });

      usersList.filter((v: any) => {
        if (v.email === data.userEmail) {
          return (userId = v.userId);
        }
      });
    });

    try {
      await ddb.renderedBook.update(takenBookId, { isBookTaken: true });
      await ddb.usersData.update(userId, { booksTaken: bookTaken });
      await firebaseDbBooks.update(takenBookId, { isBookTaken: true });
      await firebaseDbUsers.update(userId, { booksTaken: bookTaken });

      return {
        status: 'SUCCESS',
        message:
          'Book has marked as taken. Please take a book from the library',
        data: data.bookInfo.bookName,
      };
    } catch (err) {
      return {
        err,
        errorMessage: 'Something went wrong',
      };
    }
  }

  // Adding vote data for user and book

  async addVote(v: any, userId: any, votedBookArr: any) {
    let voterArr: any[] = [];
    let votedBooks: any[] = [];
    const firebaseDbBook = this.afd.list('/addedBooks');

    const firebaseDbUser = this.afd.list('/users');

    votedBooks.push(v);

    if (votedBookArr) {
      votedBookArr?.filter((alreadyVoted: any) => {
        if (alreadyVoted?.bookName !== v.bookName) {
          votedBooks.push(alreadyVoted);
          ddb.usersData.update(userId, { votedBooks: votedBooks });
          firebaseDbUser.update(userId, { votedBooks: votedBooks });
        }
      });
    } else {
      ddb.usersData.update(userId, { votedBooks: votedBooks });
      firebaseDbUser.update(userId, { votedBooks: votedBooks });
    }

    const getUser: any = localStorage.getItem('user');
    const getCurrentUser = JSON.parse(getUser);
    await firebaseDbBook.update(v.keyId, { vote: v.vote, voters: voterArr });
    await firebaseDbUser.update(userId, { votedBooks: votedBooks });
    await ddb.usersData.update(userId, { votedBooks: votedBooks });
    await ddb.renderedBook.update(v.keyId, { vote: v.vote, voters: voterArr });
  }

  // Making book available for users

  async makeBookAvailable(bookId: any, userId: any) {
    let updatedBookList: any = [];
    const firebaseDbBooks = this.afd.list('/addedBooks');
    const firebaseDbUsers = this.afd.list('/users');
    const userRef = ref(this.db, 'users/');

    onValue(userRef, async (snapshot) => {
      const users = snapshot?.val();
      let userList = Object.values(users);

      userList?.filter((user: any) => {
        if (user.userId === userId) {
          return user.booksTaken?.filter((v: any) => {
            if (v.bookInfo.keyId !== bookId) {
              updatedBookList.push(v);
              return updatedBookList;
            }
          });
        }
      });
      return updatedBookList;
    });
    await ddb.usersData.update(userId, { booksTaken: updatedBookList });
    await ddb.renderedBook.update(bookId, { isBookTaken: false });

    await firebaseDbBooks.update(bookId, { isBookTaken: false });
    await firebaseDbUsers.update(userId, { booksTaken: updatedBookList });
  }
}
