import { createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess, logout, logoutError, register, registerSuccess, registerError, getUserData, getUserDataSucces, getUserDataError, setUserData, setUserDataSuccess, setUserDataError } from './user.actions';
import { UserState, initialState } from './user.state';


export const UserStateReducer = createReducer(
    initialState,

    //LOGIN//
    on( login, ( state: UserState, { credentials }) => ({
        ...state,
        loading : true
    })),

    on( loginSuccess, ( state: UserState, { user }) => ({
        ...state,
        loading : false,
        user
    })),

    on( loginError, ( state: UserState, { error }) => ({
        ...state,
        loading : false,
        error
    })),

    //LOGOUT//
    on( logout, ( state: UserState ) => ({
        ...state,
        loading : false,
        user    : null
    })),

    on( logoutError, ( state: UserState, { error }) => ({
        ...state,
        loading : false,
        error
    })),

    //REGISTER//

    on( register, ( state: UserState, { credentials }) => ({
        ...state,
        loading : true
    })),

    on( registerSuccess, ( state: UserState ) => ({
        ...state,
        loading : false
    })),

    on( registerError, ( state: UserState, { error }) => ({
        ...state,
        loading : false,
        error
    })),

    //GET USER DATA

    on( getUserData, ( state: UserState, { id }) => ({
        ...state,
        loading : false,
    })),

    on( getUserDataSucces, ( state: UserState, { user }) => ({
        ...state,
        loading : false,
        user
    })),

    on( getUserDataError, ( state: UserState, { error }) => ({
        ...state,
        loading : false,
        error
    })),

    //SET USER DATA//

    on( setUserData, ( state: UserState, { user }) => ({
        ...state,
        loading : true,
    })),

    on( setUserDataSuccess, ( state: UserState, { id }) => ({
        ...state,
        loading : false
    })),

    on( setUserDataError, ( state: UserState, { error }) => ({
        ...state,
        loading : false,
        error
    })),
);