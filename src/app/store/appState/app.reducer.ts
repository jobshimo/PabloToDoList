import { createReducer, on } from "@ngrx/store";
import { initialState, AppState } from './app.state';
import { loading, loadingstop } from './app.actions';



export const AppStateReducer = createReducer(
    initialState,

    on( loading, ( state: AppState ) => ({
        ...state,
        loading: true
    })),

    on( loadingstop, ( state: AppState ) => ({
        ...state, 
        loading: false
    }))

    // on( changeNav, (state: AppState) => ({
    //     ...state,
    //     loading: !state.loading
    // })),
    
)