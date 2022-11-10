import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from '../services/firebase.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { DexieService } from 'src/db/dexie.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    NgxFileDropModule,
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @ViewChild('genreDropDown') genreDropDown: any;
  @ViewChild('availabilityDropDown') availabilityDropDown: any;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = false;
  stepSix: boolean = false;
  genreValue: any = '';
  availabilityValue: any = '';
  addBookForm: FormGroup<any>;
  addAuthorForm: FormGroup<any>;
  addImageForm: FormGroup<any>;
  addGenreForm: FormGroup<any>;
  addDescriptionForm: FormGroup<any>;
  addAvailabilityForm: FormGroup<any>;
  fileRef: import('@angular/fire/compat/storage').AngularFireStorageReference;
  task: any;
  fileInfo: any;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private fs: FirebaseService,
    private afd: AngularFireDatabase,
    private afs: AngularFireStorage,
    private ds: DexieService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  stepOneBtn() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
  }

  stepTwoBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
  }

  stepThreeBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = true;
    this.stepFive = false;
    this.stepSix = false;
  }

  stepFourBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = true;
    this.stepSix = false;
  }

  stepFiveBtn() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = true;
  }
  backBtnOne() {
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
  }
  backBtnTwo() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
  }

  backBtnThree() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
  }

  backBtnFour() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = true;
    this.stepFive = false;
    this.stepSix = false;
  }

  backBtnFive() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = true;
    this.stepSix = false;
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
    this.addAvailabilityForm = this.fb.group({
      availability: ['', [Validators.required]],
    });
  }

  getGenre() {
    this.genreValue = this.genreDropDown.nativeElement.value;
  }

  getAvailability() {
    this.availabilityValue = this.availabilityDropDown.nativeElement.value;
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(this.files);
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.getFilesFromDrop(file);
        });
      }
    }
  }

  getFilesFromDrop(file: any) {
    this.loading = true;
    if (!file.name) {
      file = file.target.files[0];
    }
    let name = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    let type = file.type.split('/')[1].toUpperCase();
    let size = file.size;
    console.log(size);
    const filePath = `files/${name}`;
    this.fileRef = this.afs.ref(filePath);
    this.task = this.afs.upload(filePath, file);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadUrl = this.fileRef.getDownloadURL();
          downloadUrl.subscribe((url) => {
            this.fileInfo = {
              documentUrl: url,
              name: name,
              type: type,
              size: size,
            };
            console.log('doc', this.fileInfo);
            this.loading = false;
            return this.fileInfo;
          });
        })
      )
      .subscribe();
  }

  removeImage() {
    this.fileInfo = null;
  }

  async submitBtn() {
    let bookObj = {
      bookName: this.addBookForm.controls['bookName'].value,
      authorName: this.addAuthorForm.controls['authorName'].value,
      imageUrl: this.fileInfo.documentUrl,
      description: this.addDescriptionForm.controls['description'].value,
      genre: this.genreValue,
      availability: this.availabilityValue,
    };

    this.fs.add(bookObj);

    this.addBookForm.reset();
    this.addAuthorForm.reset();
    this.fileInfo = null;
    this.addDescriptionForm.reset();
    this.addGenreForm.reset();
    this.addAvailabilityForm.reset();
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepFive = false;
    this.stepSix = false;
    alert('Successfully added book to the library');
  }
}
