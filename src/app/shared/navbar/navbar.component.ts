import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  userName: string | undefined;
  userSubscription: Subscription;

  constructor(private _Store: Store<AppState>) {
    this.userSubscription = this._Store.select('auth')
    .pipe(
      filter( ({user}) => user !== null )
    )
    .subscribe(({user}) => {
      this.userName = user?.name;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
