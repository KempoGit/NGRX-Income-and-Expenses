import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  userName: string | undefined;
  userSubscription: Subscription;

  constructor(private _AuthService: AuthService, private _Router: Router, private _Store: Store<AppState>) {
    this.userSubscription = this._Store.select('auth')
    .pipe(
      filter( ({user}) => user !== null )
    )
    .subscribe(({user}) => {
      this.userName = user?.name;
    });
  }

  logout() {
    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this._AuthService.logout()
    .then(() => {
      Swal.close();
      this._Router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
