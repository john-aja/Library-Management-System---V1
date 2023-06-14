import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from '../add-book/add-book.component';
import { AvailableBooksComponent } from '../available-books/available-books.component';
import { LibraryComponent } from '../library/library.component';
import { RemoveBookComponent } from '../remove-book/remove-book.component';
import { AdminAuthGuard } from '../services/admin-auth.guard';
import { UsersComponent } from '../users/users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LibraryComponent,
      },
      {
        path: 'availablebooks',
        component: AvailableBooksComponent,
      },
      {
        path: 'addbook',
        component: AddBookComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'removebook',
        component: RemoveBookComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppShellRoutingModule {}
