import { createAction, props } from "@ngrx/store";
import { NotesModel } from '../../models/notes.models';



export enum Types {

  ADD_TEMP_NOTE            = '[Notes State] Temp Note Add',
  DELETE_TEMP_NOTE         = '[Notes State] Temp Note Delete',
  // ADD_TEMP_TITLE        = '[Notes State] Temp Title Add'
  GET_ALL_NOTES            = '[Notes State] Get All Notes',
  GET_ALL_NOTES_SUCCESS    = '[Notes State] Get All Notes: Success',
  GET_ALL_NOTES_ERROR      = '[Notes State] Get All Notes: Error',
};


  // NOTE TEMPORAL
  export const addNoteTemp        = createAction( Types.ADD_TEMP_NOTE, props<{ note: NotesModel }>() );
  export const deleteNoteTemp     = createAction( Types.DELETE_TEMP_NOTE );

  //title//
  // export const addTittleTemp   = createAction( Types.ADD_TEMP_TITLE, props<{ title: string }>())

  //NOtTES//
  export const getAllNotes        = createAction( Types.GET_ALL_NOTES );
  export const getAllNotesSuccess = createAction( Types.GET_ALL_NOTES_SUCCESS, props<{ notes: NotesModel[] }>() );
  export const getAllNotesError   = createAction( Types.GET_ALL_NOTES_ERROR, props<{ error: any }>());

