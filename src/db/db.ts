import Dexie, { Table } from 'dexie';

export interface BookInfo {
  authorName: string;
  availability: string;
  bookName: string;
  description: string;
  genre: string;
  imageUrl: string;
  keyId: string;
}

export interface renderedBook {
  authorName: string;
  availability: string;
  bookName: string;
  description: string;
  genre: string;
  imageUrl: string;
  keyId: string;
}

export interface usersData {
  name: string;
  email: string;
  picture: string;
  userId: string;
}

export interface currentUser {
  name: string;
  email: string;
  picture: string;
  userId: string;
}

export class AppDB extends Dexie {
  bookData: Table<BookInfo, number>;
  renderedBook: Table<renderedBook, number>;
  currentUser: Table<currentUser, number>;
  usersData: Table<usersData, number>;
  constructor() {
    super('DexieDB');
    this.version(27).stores({
      bookData: '++bookId',
      renderedBook: 'keyId,book',
      currentUser: 'userId',
      usersData: 'userId',
    });
    this.open()
      .then((data) => console.log(data, 'DB Opened'))
      .catch((err) => console.log(err.message));
  }
}
export const ddb = new AppDB();
