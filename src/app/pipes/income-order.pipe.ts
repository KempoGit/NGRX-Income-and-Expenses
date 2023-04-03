import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenses } from '../models/income-expenses.model';

@Pipe({
  name: 'incomeOrder'
})
export class IncomeOrderPipe implements PipeTransform {

  transform(items: IncomeExpenses[]): IncomeExpenses[] {
    let i = [...items];
    return i.sort( (a, b) => {
      if(a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
