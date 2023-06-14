import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppShellService {
  constructor() {}
  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(true);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
