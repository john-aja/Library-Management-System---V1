import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userData: any = localStorage.getItem('user');
    const userInfo = JSON.parse(userData);
    if (
      userInfo.email === 'janakiram@surfboard.se' ||
      userInfo.email === 'janakiram.0695@gmail.com' ||
      userInfo.email === 'vendorlistingcompany@gmail.com'
    ) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
