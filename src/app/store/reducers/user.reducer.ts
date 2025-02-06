import { createReducer, on } from '@ngrx/store';
import { User } from './../../interfaces/users';
import { managerUserChange } from '../actions/user.action';

export const initialState: User = {} as User;

export const userReducer = createReducer(
  initialState,
  on(managerUserChange, (state, { user }) => {
    return { ...(state || {}), ...(user || {}) };
  })
);
