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

  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    console.log(this.receiver.authorName);
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);

    this.similarBooks = this.fs.getAllBooks().pipe(
      map((books: any) => {
        return books.filter(
          (book: any) => book.authorName === this.receiver.authorName
        );
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
    this.addVotePopup = false;
    this.takeBookPopup = false;
  }

  addVote() {
    this.addVotePopup = true;
  }
  yesVote(v: any) {
    console.log(v);
    v['vote'] = v?.vote ? v.vote + 1 : 1;
    v['voters'] = this.userInfo.name;
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
    alert(
      'This book has been marked as taken by you, you can take this book from library.'
    );
  }
  takeNo() {
    this.takeBookPopup = false;
  }
}
