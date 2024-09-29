import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading, isSidebar, stopSidebar } from './ui.actions';

export interface State {
    isLoading: boolean;
    isSidebar: boolean;
};

const initialState: State = {
    isLoading: false,
    isSidebar: false
};

export const uiReducer = createReducer(
    initialState,
    on(
        isLoading,
        (state) => ({...state, isLoading: true}),
    ),
    on(
        stopLoading,
        (state) => ({...state, isLoading: false}),
    ),
    on(
        isSidebar,
        (state) => ({...state, isSidebar: true}),
    ),
    on(
        stopSidebar,
        (state) => ({...state, isSidebar: false}),
    ),
);