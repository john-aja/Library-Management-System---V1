import { Injectable } from '@angular/core';
import { ddb } from './db';
import { ref, onValue, getDatabase } from 'firebase/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { liveQuery } from 'dexie';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DexieService {
  bookList: any = [];
  constructor(public db: AngularFireDatabase) {}

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
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
      });
      console.log(this.bookList);
    });
  }

  addBook(bookObj: any) {
    const id = 'id' + Math.random().toString(16).slice(8);
    this.db
      .list('/addedBooks')
      .set(`${id}`, { ...bookObj, keyId: `${id}` })
      .then((v: any) => console.log(v));

    ddb
      .table('bookData')
      .add({ ...bookObj })
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }
}
