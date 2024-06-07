import { createSelector } from '@ngrx/store';
import { AuthState } from '../state';

export const selectAuthState = (state: any) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.username
);

export const selectId = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.id
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
