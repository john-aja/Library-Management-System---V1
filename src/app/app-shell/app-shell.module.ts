import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppShellRoutingModule } from './app-shell-routing.module';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
@NgModule({
  declarations: [HomeComponent, SidebarComponent, ProfileInfoComponent],
  imports: [CommonModule, AppShellRoutingModule],
})
export class AppShellModule {}
