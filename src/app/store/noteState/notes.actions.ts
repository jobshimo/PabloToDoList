import { createAction, props } from "@ngrx/store";
import { NotesModel } from '../../models/notes.models';


export enum Types {

  GO_HOME                    = '[Notes State] Navigate to Home',
  
  ADD_TEMP_NOTE              = '[Notes State] Temp Note Add',
  DELETE_TEMP_NOTE           = '[Notes State] Temp Note Delete',
    
  GET_ALL_NOTES              = '[Notes State] Get All Notes',
  GET_ALL_NOTES_SUCCESS      = '[Notes State] Get All Notes: Success',
  GET_ALL_NOTES_ERROR        = '[Notes State] Set All Notes: Error',
  
  SET_ALL_NOTES_DATA         = '[Notes State] Set All Notes',
  SET_ALL_NOTES_DATA_SUCCESS = '[Notes State] Set All Notes: Success',
  SET_ALL_NOTES_DATA_ERROR   = '[Notes State] Set All Notes: Error',

  DELETE_NOTE                = '[Notes State] Delete Note',
  DELETE_NOTE_SUCCESS        = '[Notes State] Delete Note: Success',
  DELETE_NOTE_ERROR          = '[Notes State] Delete Note: Error',

  SEARCH_FILTER_NOTE         = '[Notes State] Search Filter Note',
  SEARCH_FILTER_NOTE_SUCCESS = '[Notes State] Search Filter Note: Success',
  SEARCH_FILTER_NOTE_ERROR   = '[Notes State] Search Filter Note: Error'
};

  //GO HOME
  export const goHome                  = createAction( Types.GO_HOME );

  // NOTE TEMPORAL 
  export const addNoteTemp             = createAction( Types.ADD_TEMP_NOTE, props<{ note: NotesModel }>() );
  export const deleteNoteTemp          = createAction( Types.DELETE_TEMP_NOTE );
    
  // GET NOTES//     
  export const getAllNotes             = createAction( Types.GET_ALL_NOTES );
  export const getAllNotesSuccess      = createAction( Types.GET_ALL_NOTES_SUCCESS, props<{ notes: NotesModel[] }>() );
  export const getAllNotesError        = createAction( Types.GET_ALL_NOTES_ERROR, props<{ error: any }>());

  //SET NOTES DATA// 
  export const setAllNotesData         = createAction( Types.SET_ALL_NOTES_DATA, props<{ note: NotesModel }>());
  export const setAllNotesDataSuccess  = createAction( Types.SET_ALL_NOTES_DATA_SUCCESS );
  export const setAllNotesDataError    = createAction( Types.SET_ALL_NOTES_DATA_ERROR, props<{ error: any }>());

  //DELETE NOTE// 
  export const deleteNote              = createAction( Types.DELETE_NOTE, props<{ note: NotesModel }>());
  export const deleteNoteSuccess       = createAction( Types.DELETE_NOTE_SUCCESS );
  export const deleteNoteError         = createAction( Types.DELETE_NOTE_ERROR, props<{ error: any }>());

  //SEARCH FILTER NOTE//
  export const searchFilterNote        = createAction( Types.SEARCH_FILTER_NOTE, props<{ filter: string }>());
  // export const searchFilterNoteSuccess = createAction( Types.SEARCH_FILTER_NOTE_SUCCESS, props<{ notes: NotesModel[] }>());
  // export const searchFilterNoteError   = createAction( Types.SEARCH_FILTER_NOTE_ERROR, props<{ error: any }>());
