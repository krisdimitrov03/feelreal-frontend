import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  let isAuthenticated: boolean = false;

  store.select(selectIsAuthenticated).subscribe((isAuth) => {isAuthenticated = isAuth});

  return isAuthenticated;
};
