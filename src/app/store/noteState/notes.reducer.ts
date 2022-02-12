import { createReducer, on } from "@ngrx/store";
import { initialState, NoteState } from './notes.state';
import { addNoteTemp, addTittleTemp } from './notes.actions';




export const NotesStateReducer = createReducer(
    initialState,

    on( addNoteTemp, ( state: NoteState, {note} ) => ({
        ...state,
        noteTemp: note
    })),

    on(addTittleTemp, (state:NoteState, {title}) => ({
        ...state,
    
    })),

    // on( changeNav, (state: AppState) => ({
    //     ...state,
    //     loading: !state.loading
    // })),

)
