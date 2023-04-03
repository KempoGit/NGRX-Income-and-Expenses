import { createAction, props } from '@ngrx/store';
import { IncomeExpenses } from '../models/income-expenses.model';

export const setItems = createAction(
    '[IncomeExpenses Component] Set Items',
    props<{items: IncomeExpenses[]}>()
);

export const unSetItems = createAction(
    '[IncomeExpenses Component] Unset Items',
);