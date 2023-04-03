import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import { ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  income: number = 0;
  expenses: number = 0;

  totalIncome: number = 0;
  totalExpenses: number = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Income', 'Expenses' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] }
    ]
  };

  constructor(private _Store: Store<AppState>) {
    this._Store.select('incomeExpenses').subscribe( ({items}) => {
      this.generateStatistics(items);
    });
  }

  generateStatistics(items: IncomeExpenses[]) {

    this.income = 0;
    this.expenses = 0;
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.doughnutChartData.datasets = [ { data: [ ] } ];

    for (const item of items) {
      if(item.type === 'income') {
        this.totalIncome += item.amount;
        this.income ++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses ++;
      }
    }

    this.doughnutChartData.datasets = [ { data: [this.totalIncome, this.totalExpenses] } ];
    this.chart?.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
