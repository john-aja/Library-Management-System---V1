import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
})
export class ViewBookComponent implements OnInit {
  @Input() receiver: any;
  @Input() allBooks: any;

  selectedReceiver: any;
  bookView: boolean = false;
  addVotePopup: boolean = false;
  takeBookPopup: boolean = false;

  similarBooks: any;
  userInfo: any;

  // authorBook: any;
  selectedBook: any;

  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    console.log(this.receiver);

    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);

    this.similarBooks = this.fs
      .getAuthorsBook(this.receiver.authorName, this.receiver.bookName)
      .pipe(
        map((v: any) => {
          return v;
        })
      );

    this.selectedBook = this.fs.getSelectedBook(this.receiver.keyId).pipe(
      map((v: any) => {
        console.log(v);
        return v;
      })
    );
  }

  onSelect(event: any, item: any, row: any) {
    this.bookView = true;
    this.selectedReceiver = item;
  }
  close() {
    this.bookView = false;
    this.addVotePopup = false;
    this.takeBookPopup = false;
  }

  addVote() {
    this.addVotePopup = true;
  }
  yesVote(v: any) {
    v['vote'] = v?.vote ? v.vote + 1 : 1;
    this.fs.vote(v, this.userInfo.email);
    this.addVotePopup = false;
    alert('Your vote has been added successfully for admin review.');
  }
  noVote() {
    this.addVotePopup = false;
  }

  takeBook() {
    this.takeBookPopup = true;
  }
  takeYes() {
    this.takeBookPopup = false;
    let email = this.userInfo.email;
    let takenTime = Date.now();
    const taken = {
      bookInfo: this.receiver,
      userEmail: email,
      time: takenTime,
    };

    return this.fs.bookTaken({ ...taken });
  }
  takeNo() {
    this.takeBookPopup = false;
  }
}
