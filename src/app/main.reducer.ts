import { AppState } from "./store/appState/app.state";
import { ActionReducerMap } from '@ngrx/store';
import { AppStateReducer } from "./store/appState/app.reducer";


export interface MainState {
    appState: AppState
};

export const MAIN_REDUCER : ActionReducerMap<MainState> = {
    appState : AppStateReducer
};