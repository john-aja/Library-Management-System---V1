import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { DexieService } from 'src/db/dexie.service';
import { liveQuery } from 'dexie';
import { from, map } from 'rxjs';
import { ddb } from 'src/db/db';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  item: any;
  constructor(public db: AngularFireDatabase, public ds: DexieService) {}

  add(obj: any) {
    return this.ds.addBook(obj);
  }
  getBooks() {
    return this.ds.getBooks();
  }

  getAllBooks() {
    return from(liveQuery(async () => await ddb.renderedBook.toArray()));
  }
}
