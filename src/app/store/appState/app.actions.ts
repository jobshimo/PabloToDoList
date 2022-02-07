import { createAction } from "@ngrx/store";



export enum Types {

  LOADING       = '[App State] Loading',
  LOADING_STOP  = '[App State] Loading Stop'
  // CHANGE_NAV = '[App State] Chgange Nav'
};
  
  
  // Loading:
  export const loading      = createAction( Types.LOADING );
  export const loadingstop  = createAction( Types.LOADING_STOP );
  // export const changeNav = createAction( Types.CHANGE_NAV );