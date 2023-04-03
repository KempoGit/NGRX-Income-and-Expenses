import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IncomeExpenses } from '../models/income-expenses.model';
import { IncomeExpensesService } from '../services/income-expenses.service';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnDestroy {

  incomeForm: FormGroup;
  type: string = 'income';
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _IncomeExpensesService: IncomeExpensesService,
    private _Store: Store<AppState>,
    ) {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.uiSubscription = this._Store.select('ui').subscribe(( ui ) => {
      this.loading = ui.isLoading;
    })
  }

  save() {
    if(this.incomeForm.invalid) { return; }

    this._Store.dispatch( ui.isLoading() );

    const {description, amount} = this.incomeForm.value;
    const incomeExpenses = new IncomeExpenses(description, amount, this.type);
    this._IncomeExpensesService.createIncomeExpenses(incomeExpenses)
    .then( res => {
      this._Store.dispatch( ui.stopLoading() );
      Swal.fire('Registry created', description, 'success');
      this.incomeForm.reset();
    })
    .catch (error => {
      Swal.fire('Error', error.message, 'error');
      this._Store.dispatch( ui.stopLoading() );
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
