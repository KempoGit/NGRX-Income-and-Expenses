import { Routes } from "@angular/router";
import { StatisticsComponent } from "../income-expenses/statistics/statistics.component";
import { IncomeExpensesComponent } from "../income-expenses/income-expenses.component";
import { DetailsComponent } from "../income-expenses/details/details.component";

export const dashboardRoutes: Routes = [
    {
        path: '',
        title: 'Statistics',
        component: StatisticsComponent,
    },
    {
        path: 'income-expenses',
        title: 'Income and Expenses',
        component: IncomeExpensesComponent
    },
    {
        path: 'details',
        title: 'Details',
        component: DetailsComponent
    }
];