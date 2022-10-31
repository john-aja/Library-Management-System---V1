import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  userInfo: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
  }
  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    localStorage.removeItem('lms-token');
  }
}
