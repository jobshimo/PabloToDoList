import { createReducer, on } from "@ngrx/store";
import { initialState, NoteState } from './notes.state';
import { addNoteTemp, deleteNoteTemp, getAllNotes, getAllNotesSuccess, getAllNotesError, setAllNotesData, setAllNotesDataSuccess, setAllNotesDataError } from './notes.actions';




export const NotesStateReducer = createReducer(
    initialState,

    //NOTE TEMP

    on( addNoteTemp, ( state: NoteState, {note} ) => ({
        ...state,
        noteTemp: note
    })),
    on( deleteNoteTemp, ( state: NoteState ) => ({
        ...state,
        noteTemp: null
    })),

    //NOTES//

    on( getAllNotes, ( state: NoteState ) => ({
        ...state,
        loading: true
    })),

    on( getAllNotesSuccess, ( state: NoteState, { notes } ) => ({
        ...state,
        loading: false,
        notes
    })),

    on( getAllNotesError, ( state: NoteState, { error } ) => ({
        ...state,
        loading: false,
        error
    })),

    //SET NOTES DATA//

    on( setAllNotesData, ( state: NoteState, { note } ) => ({
        ...state,
        loading: true,
    })),

    on( setAllNotesDataSuccess, ( state: NoteState  ) => ({
        ...state,
        loading: false,
    })),

    on( setAllNotesDataError, ( state: NoteState, { error } ) => ({
        ...state,
        loading: false,
        error
    })),
);



    // on(addTittleTemp, (state:NoteState, {title}) => ({
    //     ...state,

    // })),

    //NOTE

    // on( changeNav, (state: AppState) => ({
    //     ...state,
    //     loading: !state.loading
    // })),


