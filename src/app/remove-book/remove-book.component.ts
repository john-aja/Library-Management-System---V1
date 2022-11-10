import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/compat';
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import { first, map } from 'rxjs';
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
  addGenreForm!: FormGroup<any>;
  addBookIdForm!: FormGroup<any>;
  bookObj: any;
  aflCategories: any;
  constructor(
    private fb: FormBuilder,
    public db: AngularFireDatabase,
    private fbs: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.removeBookFunction();
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

  stepThreeBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = true;
    this.stepFive = false;
  }

  stepFourBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = true;
  }

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

  backBtnThree() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
    this.stepFour = false;
    this.stepFive = false;
  }

  backBtnFour() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = true;
    this.stepFive = false;
  }

  initializeForm() {
    this.addBookForm = this.fb.group({
      bookName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
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
    this.addBookIdForm = this.fb.group({
      bookId: [''],
    });
    this.addGenreForm = this.fb.group({
      bookGenre: ['', [Validators.required]],
    });
  }

  getGenre(event: any) {
    this.genreValue = this.genreDropDown.nativeElement.value;
    console.log(this.genreValue);
  }

  submitBtn() {
    this.bookObj = {
      bookName: this.addBookForm.controls['bookName'].value,
      author: this.addAuthorForm.controls['authorName'].value,
      reason: this.removeReasonForm.controls['reason'].value,
      genre: this.genreValue,
      bookId: this.addBookIdForm.controls['bookId'].value,
    };
    this.removeBookFunction();
    console.log(this.bookObj);
    this.addBookForm.reset();
    this.addAuthorForm.reset();
    this.removeReasonForm.reset();
    this.addBookIdForm.reset();
    this.addGenreForm.reset();
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    alert('Successfully removed book from the library');
  }

  removeBookFunction() {
    //   const db = getDatabase();
    //   const bookInfo = ref(db, 'addedBooks/');
    //   onValue(bookInfo, (snapshot) => {
    //     let obj = [];
    //     const data = snapshot.val();
    //     obj.push(data);
    //     console.log(obj);
    //     console.log(Object.values(obj[0]));
    //   });
    //   let theThing = this.db
    //     .list('/addedBooks', (ref) =>
    //       ref
    //         .orderByChild('bookName')
    //         .equalTo(this.bookObj.bookName)
    //         .limitToFirst(1)
    //     )
    //     .valueChanges()
    //     .pipe(first())
    //     .toPromise()
    //     .then((snapshots: any) => {
    //       console.log(snapshots);
    //       theThing = snapshots[0];
    //     });
  }
}
