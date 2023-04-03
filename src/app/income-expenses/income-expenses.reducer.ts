import { createReducer, on } from '@ngrx/store';
import { IncomeExpenses } from '../models/income-expenses.model';
import { setItems, unSetItems } from './income-expenses.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: IncomeExpenses[];
};

export interface AppStateWithIncomeExpenses extends AppState {
    incomeExpenses: State
}

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