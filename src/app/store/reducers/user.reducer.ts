import { createReducer, on } from '@ngrx/store';
import { manageruserchange } from '../actions/user.action';
export const initialState = '';
const _helloReducer = createReducer(initialState,on(manageruserchange, (state) => 'Hello, NgRx!')
);
export function helloReducer(state: any, action: any) {
return _helloReducer(state, action);
}
