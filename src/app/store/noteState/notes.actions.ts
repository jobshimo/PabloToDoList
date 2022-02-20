import { createAction, props } from "@ngrx/store";
import { NotesModel } from '../../models/notes.models';



export enum Types {

  ADD_TEMP_NOTE              = '[Notes State] Temp Note Add',
  DELETE_TEMP_NOTE           = '[Notes State] Temp Note Delete',
    
  GET_ALL_NOTES              = '[Notes State] Get All Notes',
  GET_ALL_NOTES_SUCCESS      = '[Notes State] Get All Notes: Success',
  GET_ALL_NOTES_ERROR        = '[Notes State] Set All Notes: Error',
  
  SET_ALL_NOTES_DATA         = '[Notes State] Set All Notes',
  SET_ALL_NOTES_DATA_SUCCESS = '[Notes State] Set All Notes: Success',
  SET_ALL_NOTES_DATA_ERROR   = '[Notes State] Set All Notes: Error',
  // ADD_TEMP_TITLE        = '[Notes State] Temp Title Add'
};


  // NOTE TEMPORAL
  export const addNoteTemp            = createAction( Types.ADD_TEMP_NOTE, props<{ note: NotesModel }>() );
  export const deleteNoteTemp         = createAction( Types.DELETE_TEMP_NOTE );
    
  //NOTES//    
  export const getAllNotes            = createAction( Types.GET_ALL_NOTES );
  export const getAllNotesSuccess     = createAction( Types.GET_ALL_NOTES_SUCCESS, props<{ notes: NotesModel[] }>() );
  export const getAllNotesError       = createAction( Types.GET_ALL_NOTES_ERROR, props<{ error: any }>());

  //SET NOTES DATA//
  export const setAllNotesData        = createAction( Types.SET_ALL_NOTES_DATA, props<{ note: NotesModel }>());
  export const setAllNotesDataSuccess = createAction( Types.SET_ALL_NOTES_DATA_SUCCESS );
  export const setAllNotesDataError   = createAction( Types.SET_ALL_NOTES_DATA_ERROR, props<{ error: any }>());

  //title//    
  // export const addTittleTemp       = createAction( Types.ADD_TEMP_TITLE, props<{ title: string }>())


