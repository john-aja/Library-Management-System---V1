import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-remove-book',
  templateUrl: './remove-book.component.html',
  styleUrls: ['./remove-book.component.scss'],
})
export class RemoveBookComponent implements OnInit {
  @ViewChild('genreDropDown') genreDropDown: any;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = false;
  genreValue: any = '';
  addBookForm!: FormGroup<any>;
  addAuthorForm!: FormGroup<any>;
  removeReasonForm!: FormGroup<any>;
  // addGenreForm!: FormGroup<any>;
  // addBookIdForm!: FormGroup<any>;
  bookObj: any;
  aflCategories: any;

  totalBooks: any;
  books: any = [];
  bookList: any;
  bookId: any;

  constructor(
    private fb: FormBuilder,
    public db: AngularFireDatabase,
    private fbs: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.renderBook();
  }

  renderBook() {
    this.books = this.fbs.getAllBooks().pipe(
      map((books: any) => {
        // console.log(books);
        return books?.filter((book: any) => book.availability === 'Yes');
      })
    );
    this.bookList = this.books.subscribe((v: any) => {
      this.totalBooks = v;
      this.bookList = v;
      return v;
    });
  }
  stepOneBtn() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
  }

  stepTwoBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
    this.stepFour = false;
    this.stepFive = false;
  }

  // stepThreeBtn() {
  //   this.stepOne = false;
  //   this.stepTwo = false;
  //   this.stepThree = false;
  //   this.stepFour = true;
  //   this.stepFive = false;
  // }

  // stepFourBtn() {
  //   this.stepOne = false;
  //   this.stepTwo = false;
  //   this.stepThree = false;
  //   this.stepFour = false;
  //   this.stepFive = true;
  // }

  backBtnOne() {
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
  }
  backBtnTwo() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
  }

  // backBtnThree() {
  //   this.stepOne = false;
  //   this.stepTwo = false;
  //   this.stepThree = true;
  //   this.stepFour = false;
  //   this.stepFive = false;
  // }

  // backBtnFour() {
  //   this.stepOne = false;
  //   this.stepTwo = false;
  //   this.stepThree = false;
  //   this.stepFour = true;
  //   this.stepFive = false;
  // }

  initializeForm() {
    this.addBookForm = this.fb.group({
      bookName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
    });
    this.addAuthorForm = this.fb.group({
      authorName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
    this.removeReasonForm = this.fb.group({
      reason: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
    // this.addBookIdForm = this.fb.group({
    //   bookId: [''],
    // });
    // this.addGenreForm = this.fb.group({
    //   bookGenre: ['', [Validators.required]],
    // });
  }

  // getGenre(event: any) {
  //   this.genreValue = this.genreDropDown.nativeElement.value;
  // console.log(this.genreValue);
  // }

  submitBtn() {
    this.bookObj = {
      bookName: this.addBookForm.controls['bookName'].value,
      author: this.addAuthorForm.controls['authorName'].value,
      reason: this.removeReasonForm.controls['reason'].value,
      // genre: this.genreValue,
      // bookId: this.addBookIdForm.controls['bookId'].value,
    };
    this.removeBookFunction();
    // console.log(this.bookObj);
    this.addBookForm.reset();
    this.addAuthorForm.reset();
    this.removeReasonForm.reset();
    // this.addBookIdForm.reset();
    // this.addGenreForm.reset();
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
  }

  removeBookFunction() {
    let bookToRemove = this.bookObj.bookName;
    let authorName = this.bookObj.author;
    console.log(authorName);
    console.log(bookToRemove);
    // console.log(this.totalBooks);

    // return this.fbs.getAllBooks().pipe(
    //   map((books: any) => {
    //     console.log(books);
    //     books.filter((v: any) => {
    //       console.log(v);
    //       if (bookToRemove === v.bookName) {
    //         if (v.availability === 'Yes') {
    //           console.log(v.keyId);
    //           this.bookId = v.keyId;
    //           return this.fbs.updatingBookInfo(this.bookId);
    //         } else {
    //           return alert(
    //             'Book is not available in surfboard library, please check and type an exact name of the book.'
    //           );
    //         }
    //       }
    //     });
    //   })
    // );

    this.totalBooks.filter((v: any) => {
      console.log(v);
      if (bookToRemove === v.bookName && authorName === v.authorName) {
        if (v.availability === 'Yes' && !v.isBookTaken) {
          console.log(v.keyId);
          this.bookId = v.keyId;
          return this.fbs.updatingBookInfo(this.bookId);
        } else {
          console.log('not available');
          return alert(
            'Book is not available in surfboard library, please check and type an exact name of the book.'
          );
        }
      } else {
        console.log('not a book');
        return;
      }
    });
  }
}
