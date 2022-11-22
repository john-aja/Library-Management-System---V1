import { Injectable } from '@angular/core';
import { ddb } from './db';
import { ref, onValue, getDatabase } from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DexieService {
  bookList: any = [];
  usersList: any = [];
  userId: string;
  userValues: any;
  db = getDatabase();
  constructor(public aft: AngularFireDatabase) {}

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
    this.aft
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

    const firebaseDb = this.aft.list('/addedBooks');
    try {
      await firebaseDb.update(id, { availability: 'No' });
      return alert('Successfully removed book from library');
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
        this.aft.list('users/').set(currentUser.userId, { ...currentUser });
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

  takenBook(data: any) {
    // const id = 'id' + Math.random().toString(16).slice(8);
    const userRef = ref(this.db, 'users/');
    const firebaseDbBooks = this.aft.list('/addedBooks');
    const firebaseDbUsers = this.aft.list('/users');
    const bookTaken = data.bookName;
    onValue(userRef, async (snapshot) => {
      const users = snapshot?.val();
      let usersList = Object.values(users);

      usersList.filter((v: any) => {
        if (v.email === data.userEmail) {
          this.userId = v.userId;
          // return this.userId;
        }
        return;
      });
      console.log(this.userId);

      try {
        await firebaseDbUsers.update(this.userId, { booksTaken: bookTaken });
        return alert(
          'This book has been marked as taken by you, you can take this book from library.'
        );
      } catch (err) {
        return {
          err,
          errorMessage: 'Something went wrong',
        };
      }

      // const userExists = usersList.find((v: any) => {
      //   if (v.email === data.userEmail) return v;
      // });
      // console.log(userExists);
      // if (userExists) {
      //   await firebaseDb.update(id, { takenBy: data.email });
      // } else return;
    });
  }

  addVote(v: any) {
    const firebaseDb = this.aft.list('/addedBooks');
    firebaseDb.update(v.keyId, { vote: 0 ? 1 : +1 });
  }
}
