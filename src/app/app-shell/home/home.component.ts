import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppShellService } from '../app-shell.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('navBar') sideNavBar: ElementRef;

  userInfo: any;
  changeWidth: boolean = false;
  profileBox: boolean = false;
  constructor(private router: Router, private as: AppShellService) {}

  ngOnInit(): void {
    this.userInfo = localStorage.getItem('user');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
  }

  openProfile() {
    this.profileBox = !this.profileBox;
  }
  close() {
    this.profileBox = false;
  }

  navCollapse() {
    console.log(this.sideNavBar.nativeElement);
    this.changeWidth = !this.changeWidth;
    this.as.sendClickEvent();
    this.sideNavBar.nativeElement.style.width = this.changeWidth ? '8%' : '18%';
    // this.sideNavHider.nativeElement.style.transform = this.changeWidth ? 'rotate-90':''
  }
}
