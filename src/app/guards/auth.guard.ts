import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState.pipe(
      map((user) => {
        const isLoggedIn = !!user;
        const redirectTo = route.data['redirectTo'];

        if (isLoggedIn && redirectTo) {
          this.router.navigate([redirectTo]);
          return false;
        } else if (!isLoggedIn && state.url === '/home') {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
