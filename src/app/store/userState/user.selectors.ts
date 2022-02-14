import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';


export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectUser = createSelector(
    selectUserState,
    (state: UserState) => state.user
);