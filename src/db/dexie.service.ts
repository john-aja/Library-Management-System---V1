import { Injectable } from '@angular/core';
import { ddb } from './db';
import { ref, onValue, getDatabase, update } from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DexieService {
  bookList: any = [];
  usersList: any = [];
  userValues: any;
  bookTaken: any[];
  db = getDatabase();
  constructor(public afd: AngularFireDatabase) {}

  getBooks() {
    const db = getDatabase();
    const bookInfo = ref(db, 'addedBooks/');
    onValue(bookInfo, (snapshot) => {
      let obj = [];
      const data = snapshot?.val();
      obj.push(data);

      this.bookList = data ? Object.values(data) : '';

      this.bookList.map((val: any) => {
        if (val)
          ddb.renderedBook
            .put(val)
            .then((data) => console.log('data'))
            .catch((err) => console.log(err));
      });
      // console.log(ddb.renderedBook);
      console.log(this.bookList);
    });
  }

  addBook(bookObj: any) {
    const id = 'id' + Math.random().toString(16).slice(8);
    this.afd
      .list('/addedBooks')
      .set(`${id}`, { ...bookObj, keyId: `${id}` })
      .then((v: any) => console.log(v));

    ddb
      .table('bookData')
      .add({ ...bookObj })
      .then((data) => alert('Successfully added book to the library'))
      .catch((err) => console.log(err.message));
  }

  async updateBook(id: any) {
    console.log(id);

    const db = getDatabase();
    const bookInfo = ref(db, 'addedBooks/' + id);
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

  addUserToDb(userInfo: any) {
    const id = 'user_' + Math.random().toString(16).slice(8);
    const currentUser = { ...userInfo, userId: id };
    console.log(currentUser);

    ddb.currentUser
      .add({ ...currentUser })
      .then((data) => console.log('Current user addded successfully to db'))
      .catch((err) => console.log(err.message));

    const userRef = ref(this.db, 'users/');
    onValue(userRef, (snapshot) => {
      const users = snapshot?.val();
      let usersList = Object.values(users);
      console.log(usersList);
      const userExists = usersList.find(
        (v: any) => v.email === currentUser.email
      );
      console.log('user', userExists);
      if (!userExists)
        this.afd.list('users/').set(currentUser.userId, { ...currentUser });
      else return;
    });
  }

  getUsers() {
    const db = getDatabase();
    const bookInfo = ref(db, 'users/');
    onValue(bookInfo, (snapshot) => {
      let obj = [];
      const data = snapshot?.val();
      obj.push(data);

      this.usersList = data ? Object.values(data) : '';

      this.usersList.map((val: any) => {
        if (val)
          ddb.usersData
            .put(val)
            .then((data) => console.log('data'))
            .catch((err) => console.log(err));
      });
      // console.log(ddb.renderedBook);
      console.log(this.usersList);
    });
  }

  async takenBook(data: any) {
    console.log(data);
    let userId: any;
    let bookTaken: any[] = [];
    const takenBookId = data.bookInfo.keyId;

    const userRef = ref(this.db, 'users/');
    const firebaseDbBooks = this.afd.list('/addedBooks');
    const firebaseDbUsers = this.afd.list('/users');

    bookTaken.push({ bookInfo: data.bookInfo, time: data.time });

    // user update

    onValue(userRef, async (snapshot) => {
      const users = snapshot?.val();
      let usersList = Object.values(users);

      usersList.filter((v: any) => {
        console.log(v);
        if (v.email === data.userEmail) {
          v.booksTaken?.map((s: any) => {
            console.log(s);
            return bookTaken.push(s);
          });
        }
        return bookTaken;
      });

      usersList.filter((v: any) => {
        if (v.email === data.userEmail) {
          return (userId = v.userId);
        }
        return userId;
      });

      console.log(bookTaken);
      console.log(userId);
      console.log(takenBookId);
    });

    try {
      await firebaseDbBooks.update(takenBookId, {
        isBookTaken: true,
      });
      await firebaseDbUsers.update(userId, { booksTaken: bookTaken });

      // ddb.usersData.update(userId, { booksTaken: bookTaken });
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

  addVote(v: any) {
    console.log(v);
    let voterArr: any = [];
    v.voters.map((voter: any) => {
      voterArr.push(voter);
    });

    const firebaseDb = this.afd.list('/addedBooks');
    const refFirebaseDbBooks = ref(this.db, 'addedBooks/');
    onValue(refFirebaseDbBooks, async (snapshot) => {
      const books = snapshot?.val();
      let bookList = Object.values(books);

      bookList.filter((book: any) => {
        if (v.bookName === book.bookName) {
          book.voters?.map((voter: string) => {
            v.voters.map((isExist: any) => {
              if (isExist !== voter) {
                voterArr.push(voter);
              }
            });
          });
        }
      });
    });

    console.log(voterArr);

    firebaseDb.update(v.keyId, { vote: v.vote, voters: voterArr });
  }

  async makeBookAvailable(bookId: any, userId: any) {
    console.log(bookId, userId);
    let updatedBookList: any = [];
    const firebaseDbBooks = this.afd.list('/addedBooks');
    const firebaseDbUsers = this.afd.list('/users');
    const userRef = ref(this.db, 'users/');

    onValue(userRef, async (snapshot) => {
      const users = snapshot?.val();
      let userList = Object.values(users);

      userList.filter((user: any) => {
        if (user.userId === userId) {
          user.booksTaken.map((v: any) => {
            console.log(v);
            if (v.bookInfo.keyId !== bookId) {
              console.log(v);
              updatedBookList.push(v);
              return updatedBookList;
            }
          });
        }
      });
      console.log(updatedBookList);
    });
    await firebaseDbBooks.update(bookId, { isBookTaken: false });
    await firebaseDbUsers.update(userId, { booksTaken: updatedBookList });
  }
}
