import { Component, Input, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ddb } from 'src/db/db';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() receiver: any;
  userId: any;
  changeAvailability: boolean = false;
  booksTakenContainer: boolean = true;
  booksVotedContainer: boolean = false;
  userBooks: Observable<any>;
  selectedBook: any;
  userVoted: any;
  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    this.userId = this.receiver.userId;
    this.userBooks = this.fs.getUsersDataFromDexie().pipe(
      map((v: any) => {
        return v.filter((user: any) => {
          if (this.userId === user.userId) {
            return user;
          }
        });
      })
    );
  }

  onSelect(event: any, book: any) {
    this.selectedBook = book;
    this.changeAvailability = true;
  }

  changeYes(event: any, item: any) {
    this.changeAvailability = false;
    return this.fs.makeItAvailable(this.selectedBook, this.userId);
  }
  changeNo() {
    this.changeAvailability = false;
  }
  close() {
    this.changeAvailability = false;
  }

  booksTaken() {
    this.booksTakenContainer = true;
    this.booksVotedContainer = false;
  }
  booksVoted() {
    this.booksVotedContainer = true;
    this.booksTakenContainer = false;
  }
}
