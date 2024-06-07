import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../features/auth/store/selectors/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  let isAuthenticated: boolean = false;

  store.select(selectIsAuthenticated).subscribe((isAuth) => {isAuthenticated = isAuth});

  return isAuthenticated;
};
