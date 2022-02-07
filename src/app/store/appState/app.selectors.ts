import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";


export const selectAppState = createFeatureSelector<AppState>('appState');


export const selectApp = createSelector(
    selectAppState,
    (state: AppState) => state.loading
);
