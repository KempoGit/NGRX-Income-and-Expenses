import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  canActivate():Observable<boolean> {
    return this._AuthService.isAuth()
    .pipe(
      tap( state => {
        if ( !state ) {
          this._Router.navigate(['/login']);
        }
      })
    )
  }
  
}
