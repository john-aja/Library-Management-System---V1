import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  members: boolean = true;
  admin: boolean = false;
  newMember: boolean = false;
  newAdmin: boolean = false;
  usersList: any;
  userProfile: boolean = false;
  userLength: any;

  adminList = [
    {
      name: 'Dexter',
      designation: 'Techinal Writer',
      role: 'Admin',
      email: 'dexter@surfboard.se',
    },
  ];
  selectedReceiver: any;
  userData: Observable<any>;
  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    this.getUsersFromDb();
  }

  getUsersFromDb() {
    this.userData = this.fs.getAllUser().pipe(
      map((users: any) => {
        return users;
      })
    );
    this.userData.subscribe((user) => {
      this.userLength = user;
      return this.userLength;
    });
    return this.userData;
  }

  membersTab() {
    this.members = true;
    this.admin = false;
  }
  adminsTab() {
    this.admin = true;
    this.members = false;
  }

  addMember() {
    this.newMember = true;
  }

  addAdmin() {
    this.newMember = true;
  }

  close() {
    this.newMember = false;
  }
  closeProfile() {
    this.userProfile = false;
  }

  onSelect(event: any, data: any) {
    console.log(event);
    console.log(data);
    this.selectedReceiver = data;
    this.userProfile = true;
  }
}
