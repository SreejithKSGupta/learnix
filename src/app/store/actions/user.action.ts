import { createAction, props } from '@ngrx/store';
import { User } from './../../interfaces/users';

export const managerUserChange = createAction(
  '[User] Manager User Change',
  props<{ user: User | null}>()
);
