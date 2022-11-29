import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DexieService } from 'src/db/dexie.service';
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

  adminList = [
    {
      name: 'Dexter',
      designation: 'Techinal Writer',
      role: 'Admin',
      email: 'dexter@surfboard.se',
    },
  ];
  selectedReceiver: any;
  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    this.getUsersFromDb();
  }

  getUsersFromDb() {
    this.fs.getAllUser();
    const userData = this.fs.getUsersDataFromDexie().pipe(
      map((users: any) => {
        return users;
      })
    );
    userData.subscribe((user) => {
      this.usersList = user;
      console.log(this.usersList);
      return this.usersList;
    });
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
