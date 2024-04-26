import { createReducer, on } from '@ngrx/store';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/auth.actions';
import { authState } from '../state';

export const authReducer = createReducer(
  authState,
  on(LOGIN_SUCCESS, (state, { token }) => ({ ...state, token: token })),
  on(LOGOUT_SUCCESS, (_) => authState),
);
