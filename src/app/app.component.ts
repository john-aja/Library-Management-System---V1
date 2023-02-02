import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private bnIdle: BnNgIdleService, private fs: FirebaseService) {}
  title = 'lms-portal-v1';

  ngOnInit(): void {
    this.bnIdle.startWatching(2000).subscribe((res) => {
      if (res) {
        console.log('session expired');
        this.fs.logoutUser();
      }
    });
  }
}
