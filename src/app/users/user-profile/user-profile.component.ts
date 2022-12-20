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
    console.log(this.receiver);
    this.userId = this.receiver.userId;
    console.log(this.userId);
    // this.fs.getUsersDataFromDexie();
    this.userBooks = this.fs.getUsersDataFromDexie().pipe(
      map((v: any) => {
        console.log(v);
        return v.filter((user: any) => {
          if (this.userId === user.userId) {
            console.log(user);
            return user;
          }
        });
      })
    );

    // this.userVoted = this.fs.getUsersDataFromDexie().pipe(map((v:any)=>{
    //   return v.filter((voted:any)=>{
    //     if(this.userId === voted.userId) {

    //     }
    //   })
    // }))
  }

  onSelect(event: any, book: any) {
    console.log(book);
    this.selectedBook = book;
    // return this.fs.makeItAvailable(book, userId);
    this.changeAvailability = true;
  }

  changeYes(event: any, item: any) {
    console.log(item);
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
    console.log(this.userBooks.subscribe((v) => console.log(v)));
    this.booksVotedContainer = true;
    this.booksTakenContainer = false;
  }
}
