import { createReducer, on } from '@ngrx/store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_STATE_SUCCESS } from '../actions/auth.actions';
import { authState } from '../state';

export const authReducer = createReducer(
  authState,
  on(LOGIN_SUCCESS, (_state, user) => {

    return { isAuthenticated: true, user: user };
  }),
  on(LOGOUT_SUCCESS, (_) => ({ isAuthenticated: false, user: null})),
  on(SET_STATE_SUCCESS, (_, user) => ({ isAuthenticated: true, user: user }))
);
