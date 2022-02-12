import { createAction, props } from "@ngrx/store";
import { NotesModel } from '../../models/notes.models';



export enum Types {

  ADD_TEMP_NOTE  = '[Notes State] Temp Note Add',
  ADD_TEMP_TITLE = '[Notes State] Temp Title Add'

};


  // NOTE TEMPORAL
  export const addNoteTemp  = createAction( Types.ADD_TEMP_NOTE, props<{ note: NotesModel}>() );
  
  //title//
  export const addTittleTemp = createAction( Types.ADD_TEMP_TITLE, props<{ title: string }>())

