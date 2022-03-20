import { createAction } from "@ngrx/store";



export enum Types {

  LOADING       = '[App State] Loading',
  LOADING_STOP  = '[App State] Loading Stop'
};
  
  
  // Loading:
  export const loading      = createAction( Types.LOADING );
  export const loadingstop  = createAction( Types.LOADING_STOP );