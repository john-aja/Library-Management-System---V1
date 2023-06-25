import { Component, OnInit } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { DexieService } from 'src/db/dexie.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.scss'],
})
export class AvailableBooksComponent implements OnInit {
  selectedReceiver: any;
  bookView: boolean = false;
  searchText: string;

  bookList: any;
  bookItems: Observable<any>;
  books: Observable<any>;
  sort: boolean = true;
  emptyState: boolean = false;
  loading: boolean = false;
  totalBooks: any;
  constructor(private fs: FirebaseService, private ds: DexieService) {}

  ngOnInit(): void {
    this.renderBook();
    this.ds.getUsers();
  }

  renderBook() {
    this.loading = true;
    this.books = this.fs.getAllBooks().pipe(
      map((books: any) => {
        console.log(books);
        this.totalBooks = books;
        return books?.filter((book: any) => {
          if (book.availability === 'Yes') {
            this.loading = false;
            return book;
          }
        });
      })
    );
    console.log(this.totalBooks);
    return this.books;
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
    if (currentGenre) {
      this.books = this.fs.getAllBooks().pipe(
        map((v: any) => {
          this.emptyState = false;
          return v.filter((w: any) => {
            if (w.genre === currentGenre && w.availability === 'Yes') {
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
    this.totalBooks = this.totalBooks.filter((v: any) => {
      if (v.availability === 'Yes') {
        return v;
      }
    });
    if (this.sort) {
      this.totalBooks = this.totalBooks?.sort((a: any, b: any) => {
        return a.bookName.toLowerCase().localeCompare(b.bookName.toLowerCase());
      });
      this.sort = false;
      this.books = of(this.totalBooks);
      return this.totalBooks;
    } else {
      this.totalBooks = this.totalBooks?.sort((a: any, b: any) => {
        return b.bookName.toLowerCase().localeCompare(a.bookName.toLowerCase());
      });
      this.sort = true;
      this.books = of(this.totalBooks);
      return this.totalBooks;
    }
  }
}
