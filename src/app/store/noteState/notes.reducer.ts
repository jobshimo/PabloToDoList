import { createReducer, on } from "@ngrx/store";
import { initialState, NoteState } from './notes.state';
import { addNoteTemp, deleteNoteTemp, getAllNotes, getAllNotesSuccess, getAllNotesError, setAllNotesData, setAllNotesDataSuccess, setAllNotesDataError, deleteNote, deleteNoteSuccess, deleteNoteError, searchFilterNote, } from './notes.actions';


export const NotesStateReducer = createReducer(
    initialState,

    //NOTE TEMP//
    on( addNoteTemp, ( state: NoteState, {note} ) => ({
        ...state,
        noteTemp: note
    })),
    on( deleteNoteTemp, ( state: NoteState ) => ({
        ...state,
        noteTemp: null
    })),

    //GET NOTES//
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
        noteTemp: null
    })),

    on( setAllNotesDataError, ( state: NoteState, { error } ) => ({
        ...state,
        loading: false,
        error
    })),

    //DELETE NOTE//
    on( deleteNote, ( state: NoteState, { note } ) => ({
        ...state,
        loading: true,
        noteTemp:note
    })),
    on( deleteNoteSuccess, ( state: NoteState ) => ({
        ...state,
        loading: false,
        noteTemp: null
    })),

    on( deleteNoteError, ( state: NoteState, { error } ) => ({
        ...state,
        loading: false,
        error
    })),

    //SEARCH FILTER NOTE//
    on( searchFilterNote, ( state: NoteState, { filter } ) => ({
        ...state,
        search : filter
    })),
);


