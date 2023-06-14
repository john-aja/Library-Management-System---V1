import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginPageService } from 'src/app/login-page/login-page.service';
import { AppShellService } from '../app-shell.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  clickEventsubscription: Subscription;
  hideText: boolean = false;
  menuContainer: boolean = false;

  userData: any;

  navBarModule: any[] = [
    {
      title: 'Library',
      icon: '../../assets/library building.svg',
      route: '',
      highlight: true,
      user: true,
    },
    {
      title: 'Available Books',
      icon: '../../assets/book_light.svg',
      route: 'availablebooks',
      highlight: false,
      user: true,
    },
    {
      title: 'Add Book',
      icon: '../../assets/library add_light.svg',
      route: 'addbook',
      highlight: false,
      user: false,
    },
    {
      title: 'Remove Book',
      icon: '../../assets/library remove_light.svg',
      route: 'removebook',
      highlight: false,
      user: false,
    },
    {
      title: 'Users',
      icon: '../../assets/user_light.svg',
      route: 'users',
      highlight: false,
      user: false,
    },
  ];
  highlight: any;
  constructor(private as: AppShellService, private ls: LoginPageService) {}

  ngOnInit() {
    this.clickEventsubscription = this.as.getClickEvent().subscribe(() => {
      this.changeToIcon();
    });
    let userInfo: any = localStorage.getItem('user');
    this.userData = JSON.parse(userInfo);
    console.log(this.userData);
    if (this.userData.email === 'janakiram@surfboard.se') {
      return this.navBarModule;
    } else {
      this.navBarModule = this.navBarModule.splice(0, 2);
      return this.navBarModule;
    }
  }
  routesChange(event: any, route: any) {
    if (route == '') {
      this.highlight = true;
    }
    this.menuContainer = false;
    this.highlight = event;
  }
  openMenu() {
    this.menuContainer = !this.menuContainer;
  }
  closeMenu() {
    this.menuContainer = false;
  }
  changeToIcon() {
    if (!this.hideText) this.hideText = true;
    else this.hideText = false;
  }
}
