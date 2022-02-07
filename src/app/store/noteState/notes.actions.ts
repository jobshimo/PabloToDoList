import { createAction, props } from "@ngrx/store";
import { NotesModel } from '../../models/notas.models';



export enum Types {

  ADD_TEMP_NOTE  = '[Notes State] Temp Note Add',

  // CHANGE_NAV = '[App State] Chgange Nav'
};


  // Loading:
  export const addNoteTemp  = createAction( Types.ADD_TEMP_NOTE, props<{ note: NotesModel}>() );
  // export const changeNav = createAction( Types.CHANGE_NAV );
