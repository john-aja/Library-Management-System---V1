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
  userBooks: Observable<any>;
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
  }

  onSelect(event: any, book: any) {
    console.log(book);
    const userId = this.receiver.userId;
    return this.fs.makeItAvailable(book, userId);
  }
}
