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
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoadingComponent } from './loading/loading.component';

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
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
