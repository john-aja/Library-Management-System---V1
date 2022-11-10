import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  navBarModule = [
    {
      title: 'Library',
      icon: '../../assets/library building.svg',
      route: '',
      highlight: true,
    },
    {
      title: 'Available Books',
      icon: '../../assets/book_light.svg',
      route: 'availablebooks',
      highlight: false,
    },
    {
      title: 'Add Book',
      icon: '../../assets/library add_light.svg',
      route: 'addbook',
      highlight: false,
    },
    {
      title: 'Remove Book',
      icon: '../../assets/library remove_light.svg',
      route: 'removebook',
      highlight: false,
    },
    {
      title: 'Users',
      icon: '../../assets/user_light.svg',
      route: 'users',
      highlight: false,
    },
  ];
  highlight: any;
  constructor(private as: AppShellService) {}

  ngOnInit(): void {
    this.clickEventsubscription = this.as.getClickEvent().subscribe(() => {
      this.changeToIcon();
    });
  }
  routesChange(event: any, route: any) {
    if (route == '') {
      this.highlight = true;
    }
    this.menuContainer = false;
    this.highlight = event;
    console.log(event);
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
