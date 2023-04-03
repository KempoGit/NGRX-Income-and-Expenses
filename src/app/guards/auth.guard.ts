import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  canLoad():Observable<boolean> {
    return this._AuthService.isAuth()
    .pipe(
      tap( state => {
        if ( !state ) {
          this._Router.navigate(['/login']);
        }
      }),
      take(1)
    )
  }
  
}
