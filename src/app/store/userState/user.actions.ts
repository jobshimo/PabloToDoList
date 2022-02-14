import { createAction, props } from "@ngrx/store";
import { CredentialsModels } from '../../models/credentials.models';
import { UserModels } from '../../models/user.models';



 export enum Types{
     //LOGIN//
    LOGIN            = '[User State] Login',
    LOGIN_SUCCESS    = '[User State] Login: Success',
    LOGIN_ERROR      = '[User State] Login: Error',
    //LOGOUT//
    LOGOUT           = '[User State] Logout',
    LOGOUT_SUCCESS   = '[User State] Logout: Success',
    LOGOUT_ERROR     = '[User State] Logout: Error',
    //REGISTER
    REGISTER         = '[User State] Register',
    REGISTER_SUCCESS = '[User State] Register',
    REGISTER_ERROR   = '[User State] Register',
 };


 //LOGIN//
 export const login           = createAction( Types.LOGIN, props <{ credentials: CredentialsModels }>());
 export const loginSuccess    = createAction ( Types.LOGIN_SUCCESS, props <{ user: UserModels}>());
 export const loginError      = createAction( Types.LOGIN_ERROR, props <{ error: any }>());
 //LOGOUT//
 export const logout          = createAction( Types.LOGOUT);
 export const logoutSuccess   = createAction( Types.LOGOUT_SUCCESS);
 export const logoutError     = createAction( Types.LOGOUT_ERROR, props <{ error: any }>());
 //REGISTER//
 export const register        = createAction( Types.REGISTER, props <{ credentials: CredentialsModels }>());
 export const registerSuccess = createAction( Types.REGISTER_SUCCESS);
 export const registerError   = createAction(Types.REGISTER_ERROR,  props <{ error: any }>());
 
