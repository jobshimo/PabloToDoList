import { UserModels } from '../../models/user.models';


export interface UserState {

    user   : UserModels | null,
    loading: boolean,
    error  : any
};

export const initialState: UserState = {

    user   : null,
    loading: false,
    error  : null
};