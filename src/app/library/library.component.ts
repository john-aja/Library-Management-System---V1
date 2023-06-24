import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  books: Observable<any>;

  constructor(
    public afd: AngularFireDatabase,
    private fs: FirebaseService,
    private router: Router,
    private ds: DexieService
  ) {}

  ngOnInit(): void {
    this.renderBook();
    this.ds.getUsers();
  }

  async renderBook() {
    this.books = this.fs.getAllBooks().pipe(
      map((v: any) => {
        this.totalBooks = v;
        this.bookList = v;
        return v;
      })
    );
    return this.books;
  }

  onSelect(event: any, item: any, row: any) {
    this.bookView = true;
    this.selectedReceiver = item;
    const valueUrl = this.router.url.replace(
      '/',
      `/${this.selectedReceiver.keyId}`
    );
  }

  close() {
    this.bookView = false;
  }

  filterByGenre(genre: any) {
    let currentGenre = genre.value;
    if (currentGenre) {
      this.books = this.fs.getAllBooks().pipe(
        map((v: any) => {
          this.emptyState = false;
          return v.filter((w: any) => {
            if (w.genre === currentGenre) {
              return w;
            }
          });
        })
      );
    }
    if (currentGenre === '') {
      this.books = this.fs.getAllBooks().pipe(
        map((v: any) => {
          return v.map((w: any) => {
            return w;
          });
        })
      );
    }
  }

  sortBooks() {
    if (this.sort) {
      this.sort = false;
      this.totalBooks = this.totalBooks?.sort((a: any, b: any) => {
        return a.bookName.toLowerCase().localeCompare(b.bookName.toLowerCase());
      });
      return this.totalBooks;
    } else {
      this.sort = true;
      this.totalBooks = this.totalBooks?.sort((a: any, b: any) => {
        return b.bookName.toLowerCase().localeCompare(a.bookName.toLowerCase());
      });
      return this.totalBooks;
    }
  }
}
