import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    let loggedIn = this.loginService.loggedIn.getValue();

    if (loggedIn) {
      console.log('Is logged in. Auth Guard');
      return true;
    } else {
      console.log('Redirect from Auth Guard');
      return this.router.parseUrl('/login');
    }
  }
}
