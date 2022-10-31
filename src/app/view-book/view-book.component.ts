import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss'],
})
export class ViewBookComponent implements OnInit {
  @Input() receiver: any;
  @Input() allBooks: any;
  @Input() availabilityBtn: any;
  selectedReceiver: any;
  bookView: boolean = false;
  addVotePopup: boolean = false;
  takeBookPopup: boolean = false;

  similarBooks: any;
  userInfo: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.receiver);
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);

    this.similarBooks = this.allBooks.filter((v: any) => {
      if (this.receiver.author === v.author) {
        return v;
      }
    });
    console.log(this.similarBooks);
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
