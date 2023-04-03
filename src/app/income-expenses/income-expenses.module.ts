import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeOrderPipe } from '../pipes/income-order.pipe';
import { DetailsComponent } from './details/details.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { StatisticsComponent } from './statistics/statistics.component';

// NgCharts
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { incomeExpensesReducer } from './income-expenses.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailsComponent,
    IncomeOrderPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpenses', incomeExpensesReducer),
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ],
  exports: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailsComponent,
    IncomeOrderPipe
  ]
})
export class IncomeExpensesModule { }
