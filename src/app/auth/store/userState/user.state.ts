import { MainState } from 'src/app/main.reducer';
import { UserModels } from '../../../models/user.models';


export interface UserState {

    user   : UserModels | null,
    loading: boolean,
    error  : any
};

export interface MainStateWithUser  extends MainState{
    userState : UserState
}

export const initialState: UserState = {

    user   : null,
    loading: false,
    error  : null
};