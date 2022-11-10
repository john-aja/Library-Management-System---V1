import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, onValue, getDatabase } from 'firebase/database';
import { filter, map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.scss'],
})
export class AvailableBooksComponent implements OnInit {
  userInfo: any;
  selectedReceiver: any;
  bookView: boolean = false;
  searchText: string;
  bookLists: Observable<any>;
  bookList: any;
  books: any = [];
  sort: boolean = true;
  emptyState: boolean = false;
  totalBooks: any;
  constructor(private db: AngularFireDatabase, private fs: FirebaseService) {}

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
    this.renderBook();
    // console.log(this.bookList);
  }

  renderBook() {
    this.fs.getBooks();
    this.bookLists = this.fs.getAllBooks().pipe(
      map((books: any) => {
        return books?.filter((book: any) => book.availability === 'Yes');
      })
    );
  }

  onSelect(event: any, item: any, row: any) {
    console.log(event);
    this.bookView = true;
    this.selectedReceiver = item;
    console.log(this.selectedReceiver);
  }
  close() {
    this.bookView = false;
  }

  filterByGenre(genre: any) {
    let currentGenre = genre.value;
    this.bookList = this.totalBooks;
    if (currentGenre === currentGenre) {
      this.bookList = this.bookList?.filter((v: any) => {
        if (v?.genre === currentGenre) {
          if (this.bookList.length !== 0) {
            // this.bookList = v;
            console.log(this.bookList);
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
        }
      });
    }

    if (this.bookList.length === 0) {
      this.emptyState = true;
    }
  }

  sortBooks() {
    this.sort = !this.sort;
    if (!this.sort) {
      return this.bookList.sort((a: any, b: any) =>
        a.bookName.localeCompare(b.bookName)
      );
    }
    if (this.sort) {
      return this.bookList.sort((a: any, b: any) =>
        b.bookName.localeCompare(a.bookName)
      );
    }
  }
}
