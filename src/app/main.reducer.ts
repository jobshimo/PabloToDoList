import { AppState } from "./store/appState/app.state";
import { ActionReducerMap } from '@ngrx/store';
import { AppStateReducer } from "./store/appState/app.reducer";
import { NoteState } from './store/noteState/notes.state';
import { NotesStateReducer } from './store/noteState/notes.reducer';
import { UserState } from "./store/userState/user.state";
import { UserStateReducer } from "./store/userState/user.reducer";


export interface MainState {
    appState : AppState,
    noteState: NoteState
    userState: UserState
};

export const MAIN_REDUCER : ActionReducerMap<MainState> = {
    appState : AppStateReducer,
    noteState: NotesStateReducer,
    userState: UserStateReducer
};
