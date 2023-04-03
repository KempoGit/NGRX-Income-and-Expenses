import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from '../app.reducer';
import { IncomeExpensesService } from '../services/income-expenses.service';
import * as actions from '../income-expenses/income-expenses.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy{

  userSubscription!: Subscription;

  incomeExpensesSubscription!: Subscription;

  constructor(
    private _Store: Store<AppState>,
    private _IncomeExpensesService: IncomeExpensesService,
    ) {
    this.userSubscription = this._Store.select('auth')
    .pipe(
      filter(auth => auth.user !== null)
    )
    .subscribe( ({user}: any) => {
      this.incomeExpensesSubscription = this._IncomeExpensesService.initIncomeExpensesListener(user.uid)
      .subscribe( (incomeExpensesFB: any) => {
        this._Store.dispatch(actions.setItems({items:incomeExpensesFB}))
      });
      
    });
  }

  ngOnDestroy(): void {
    this.incomeExpensesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
