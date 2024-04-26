import { createSelector } from '@ngrx/store';
import { AuthState } from '../state';

export const selectAuthState = (state: AuthState) => state;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.username
);
