import { createReducer, on } from '@ngrx/store';
import { IncomeExpenses } from '../models/income-expenses.model';
import { setItems, unSetItems } from './income-expenses.actions';

export interface State {
    items: IncomeExpenses[];
};

const initialState: State = {
    items: []
};

export const incomeExpensesReducer = createReducer(
    initialState,
    on(
        setItems,
        ( state, { items } ) => ({ ...state, items: [...items] }),
    ),
    on(
        unSetItems,
        ( state ) => ({...state, items: [] }),
    ),
);