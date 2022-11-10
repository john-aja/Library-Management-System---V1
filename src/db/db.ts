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

export class AppDB extends Dexie {
  bookData: Table<BookInfo, number>;
  renderedBook: Table<renderedBook, number>;
  constructor() {
    super('DexieDB');
    this.version(19).stores({
      bookData: '++bookId',
      renderedBook: 'keyId,book',
    });
    this.open()
      .then((data) => console.log(data, 'DB Opened'))
      .catch((err) => console.log(err.message));
  }
}
export const ddb = new AppDB();
