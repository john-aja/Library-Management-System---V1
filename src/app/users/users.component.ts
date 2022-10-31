import { Component, OnInit } from '@angular/core';

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
  usersList = [
    {
      name: 'Tommy',
      designation: 'Software Developer',
      role: 'User',
      email: 'tommy@surfboard.se',
      numberOfBooksTaken: '4',
    },
    {
      name: 'Shelby',
      designation: 'Designer',
      role: 'User',
      email: 'shelby@surfboard.se',
      numberOfBooksTaken: '2',
    },
    {
      name: 'Arthur',
      designation: 'Quality Analyst',
      role: 'User',
      email: 'arthur@surfboard.se',
      numberOfBooksTaken: '5',
    },
    {
      name: 'Tyrion',
      designation: 'Software Developer',
      role: 'User',
      email: 'tyrion@surfboard.se',
      numberOfBooksTaken: '7',
    },

    {
      name: 'Shelby',
      designation: 'Designer',
      role: 'User',
      email: 'shelby@surfboard.se',
      numberOfBooksTaken: '2',
    },
    {
      name: 'Arthur',
      designation: 'Quality Analyst',
      role: 'User',
      email: 'arthur@surfboard.se',
      numberOfBooksTaken: '5',
    },
    {
      name: 'Tyrion',
      designation: 'Software Developer',
      role: 'User',
      email: 'tyrion@surfboard.se',
      numberOfBooksTaken: '7',
    },
  ];

  adminList = [
    {
      name: 'Dexter',
      designation: 'Techinal Writer',
      role: 'Admin',
      email: 'dexter@surfboard.se',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

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
}
