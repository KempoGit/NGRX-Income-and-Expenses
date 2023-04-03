import { ActionReducerMap } from "@ngrx/store";
import * as ui from "./shared/ui.reducer"
import * as auth from "./auth/auth.reducer"
import * as incomeExpenses from "./income-expenses/income-expenses.reducer"


export interface AppState {
    ui: ui.State;
    auth: auth.State;
    incomeExpenses: incomeExpenses.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
    incomeExpenses: incomeExpenses.incomeExpensesReducer,
}