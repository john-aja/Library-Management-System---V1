import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @ViewChild('genreDropDown') genreDropDown: any;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = false;
  genreValue: any = '';
  addBookForm: FormGroup<any>;
  addAuthorForm: FormGroup<any>;
  addImageForm: FormGroup<any>;
  addGenreForm: FormGroup<any>;
  addDescriptionForm!: FormGroup<any>;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
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
    this.addImageForm = this.fb.group({
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
    this.addDescriptionForm = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
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
    let bookObj = {
      bookName: this.addBookForm.controls['bookName'].value,
      author: this.addAuthorForm.controls['authorName'].value,
      imageUrl: this.addImageForm.controls['imageUrl'].value,
      genre: this.genreValue,
      description: this.addDescriptionForm.controls['description'].value,
    };
    console.log(bookObj);
    this.addBookForm.reset();
    this.addAuthorForm.reset();
    this.addImageForm.reset();
    this.addDescriptionForm.reset();
    this.addGenreForm.reset();
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    alert('Successfully added book to the library');
  }
}
