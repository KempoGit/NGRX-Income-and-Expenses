import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import { IncomeExpensesService } from 'src/app/services/income-expenses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnDestroy {

  incomeExpenses!: IncomeExpenses[];
  incomeExpensesSubscription!: Subscription;

  constructor( private _Store: Store<AppState>, private _IncomeExpensesService: IncomeExpensesService) {
    this.incomeExpensesSubscription = this._Store.select('incomeExpenses')
    .subscribe( ({ items }) => this.incomeExpenses = items );
  }

  delete(uid?: string) {
    this._IncomeExpensesService.deleteIncomeExpenses(uid)
    .then( () => Swal.fire('Deleted', 'Item deleted', 'success') )
    .catch( (error) => Swal.fire('Error', error.message, 'error') );
  }

  ngOnDestroy(): void {
    this.incomeExpensesSubscription.unsubscribe();
  }

}
