import { User } from './../../interfaces/users';
import { createFeatureSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<User>('user');
