import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SearchFilterPipe } from './search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { LibraryComponent } from './library/library.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { RemoveBookComponent } from './remove-book/remove-book.component';
import { UsersComponent } from './users/users.component';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LibraryComponent,
    ViewBookComponent,
    SearchFilterPipe,
    AvailableBooksComponent,
    RemoveBookComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
