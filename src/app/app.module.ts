import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { LoginModule } from './login/login.module';
import {
  Route,
  RouterModule,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  Router,
} from '@angular/router';
import { LoginService } from './login/login.service';
import { AuthenticationGuard } from './authentication.guard';

let isLoggedIn: boolean = false;
let loginServiceCache: LoginService;
let routerCache: Router;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    matcher: isLoggedInMatcher,
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    matcher: isNotLoggedInMatcher,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

function isLoggedInMatcher(segments: UrlSegment[]) {
  if (loginServiceCache !== undefined) {
    isLoggedIn = loginServiceCache.loggedIn.getValue();
  }
  if (isLoggedIn === true) {
    console.log('isLoggedInMatcher');
    return { consumed: segments };
  }
  return null;
}

function isNotLoggedInMatcher(segments: UrlSegment[]) {
  if (loginServiceCache !== undefined) {
    isLoggedIn = loginServiceCache.loggedIn.getValue();
  }
  if (isLoggedIn === false) {
    console.log('isNotLoggedInMatcher');
    routerCache.navigateByUrl('login');
    return { consumed: [new UrlSegment('login', {})] };
  }
  return null;
}

function initializeApp(loginService: LoginService, router: Router) {
  return async () => {
    return await new Promise(async (res) => {
      console.log('Running initializeApp', loginService);

      loginServiceCache = loginService;
      routerCache = router;

      isLoggedIn = await loginService.isAuthenticated();
      console.log('isAuthenticated', isLoggedIn);
      res(isLoggedIn);
    });
  };
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    LoginModule,
  ],
  declarations: [AppComponent],
  providers: [
    AuthenticationGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [LoginService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
