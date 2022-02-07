import { AppState } from "./store/appState/app.state";
import { ActionReducerMap } from '@ngrx/store';
import { AppStateReducer } from "./store/appState/app.reducer";
import { NoteState } from './store/noteState/notes.state';
import { NotesStateReducer } from './store/noteState/notes.reducer';


export interface MainState {
    appState: AppState,
    noteState: NoteState
};

export const MAIN_REDUCER : ActionReducerMap<MainState> = {
    appState : AppStateReducer,
    noteState: NotesStateReducer
};
