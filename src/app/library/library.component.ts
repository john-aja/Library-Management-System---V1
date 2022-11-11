import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { DexieService } from 'src/db/dexie.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  userInfo: any;
  selectedReceiver: any;
  bookView: boolean = false;
  searchText: string;
  bookList: any = [];
  sort: boolean = true;
  emptyState: boolean = false;
  totalBooks: any;
  dataId: any;
  books: any;
  constructor(public afd: AngularFireDatabase, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.renderBook();
  }

  renderBook() {
    this.fs.getBooks();
    this.books = this.fs.getAllBooks().pipe(map((books: any) => books));
    this.books.subscribe((v: any) => {
      this.bookList = v;
      this.totalBooks = v;
      return this.bookList;
    });
  }

  onSelect(event: any, item: any, row: any) {
    this.bookView = true;
    this.selectedReceiver = item;
  }

  close() {
    this.bookView = false;
  }

  filterByGenre(genre: any) {
    let currentGenre = genre.value;
    this.totalBooks = this.bookList;
    // console.log(this.bookList);
    if (currentGenre === currentGenre) {
      this.totalBooks = this.bookList?.filter((v: any) => {
        if (v?.genre === currentGenre) {
          if (this.bookList.length !== 0) {
            // this.bookList = v;
            // console.log(this.bookList);
            this.emptyState = false;
            return v;
          } else {
            return (this.emptyState = true);
          }
        }
        if (currentGenre === '') {
          if (this.bookList.length !== 0) {
            this.emptyState = false;
            return this.bookList;
          } else this.emptyState = true;
        } else return;
      });
    }

    if (this.totalBooks?.length === 0) {
      this.emptyState = true;
    }
  }

  sortBooks() {
    this.sort = !this.sort;
    if (!this.sort) {
      this.bookList?.sort((a: any, b: any) =>
        a.bookName.localeCompare(b.bookName)
      );
    }
    if (this.sort) {
      this.bookList?.sort((a: any, b: any) =>
        b.bookName.localeCompare(a.bookName)
      );
    }
  }
}
