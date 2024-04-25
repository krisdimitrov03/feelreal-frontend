import { createReducer, on } from '@ngrx/store';
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
}

export const initialAuthState: AuthState = { user: null, token: null };

export const authReducer = createReducer(
  initialAuthState,
  on(LOGIN_SUCCESS, (state, { token }) => ({ ...state, token: token })),
  on(LOGOUT_SUCCESS, (_) => initialAuthState),
);
