import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  loggedIn = new BehaviorSubject(false);

  constructor(private router: Router) {
    console.log('Login Service was created.');
  }

  public login() {
    console.log('Login Service: Logged in');
    this.loggedIn.next(true);
    this.router.navigateByUrl('/home');
  }

  public logout() {
    this.loggedIn.next(false);
    // this.router.navigateByUrl('/login');
    window.location.href = '/login';
  }

  public async isAuthenticated(): Promise<boolean> {
    return await new Promise((res) => {
      console.log('Authenticating!');
      setTimeout(() => {
        res(this.loggedIn.getValue());
      }, 5000);
    });
  }
}
