import { createAction, props } from "@ngrx/store";
import { CredentialsModels } from '../../../models/credentials.models';
import { UserModels } from '../../../models/user.models';

 export enum Types{
    
    //LOGIN//
    LOGIN                 = '[User State] Login',
    LOGIN_SUCCESS         = '[User State] Login: Success',
    LOGIN_ERROR           = '[User State] Login: Error',
    //LOGOUT//     
    LOGOUT                = '[User State] Logout',
    LOGOUT_SUCCESS        = '[User State] Logout: Success',
    LOGOUT_ERROR          = '[User State] Logout: Error',
    //REGISTER     
    REGISTER              = '[User State] Register',
    REGISTER_SUCCESS      = '[User State] Register',
    REGISTER_ERROR        = '[User State] Register',
    //GET USER DATA
    GET_USER_DATA         = '[User State] Get User Data',
    GET_USER_DATA_SUCCESS = '[User State] Get User Data: Success',
    GET_USER_DATA_ERROR   = '[User State] Get User Data: Error',
    //SET USER DATA
    SET_USER_DATA         = '[User State] Set User Data',
    SET_USER_DATA_SUCCESS = '[User State] Set User Data: Success',
    SET_USER_DATA_ERROR   = '[User State] Set User Data: Error',
 };


 //LOGIN//
 export const login             = createAction( Types.LOGIN, props <{ credentials: CredentialsModels }>());
 export const loginSuccess      = createAction ( Types.LOGIN_SUCCESS, props <{ user: UserModels }>());
 export const loginError        = createAction( Types.LOGIN_ERROR, props <{ error: any }>());
 //LOGOUT//  
 export const logout            = createAction( Types.LOGOUT );
 export const logoutSuccess     = createAction( Types.LOGOUT_SUCCESS );
 export const logoutError       = createAction( Types.LOGOUT_ERROR, props <{ error: any }>());
 //REGISTER//  
 export const register          = createAction( Types.REGISTER, props <{ credentials: CredentialsModels }>());
 export const registerSuccess   = createAction( Types.REGISTER_SUCCESS );
 export const registerError     = createAction( Types.REGISTER_ERROR, props <{ error: any }>());
 //GET USER DATA//
 export const getUserData       = createAction( Types.GET_USER_DATA, props <{ id:string }>() );
 export const getUserDataSucces = createAction( Types.GET_USER_DATA_SUCCESS, props <{ user: UserModels }>());
 export const getUserDataError  = createAction( Types.GET_USER_DATA_ERROR, props <{ error: any }>());
 //SET USER DATA//
 export const setUserData        = createAction( Types.SET_USER_DATA_SUCCESS, props <{ user: UserModels }>());
 export const setUserDataSuccess = createAction( Types.SET_USER_DATA_SUCCESS );
 export const setUserDataError   = createAction( Types.SET_USER_DATA_ERROR, props <{ error: any }>());
