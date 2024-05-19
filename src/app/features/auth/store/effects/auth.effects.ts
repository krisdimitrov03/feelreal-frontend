import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../../../../core/services/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FINISH,
  SET_STATE_FAILURE,
  SET_STATE_FROM_STORAGE,
  SET_STATE_SUCCESS,
} from '../actions/auth.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { LoginDTO } from '../../../../shared/models/LoginDTO';
import { RegisterDTO } from '../../../../shared/models/RegisterDTO';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../../shared/models/User';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      exhaustMap((action) =>
        this.authService
          .login(action as LoginDTO)
          .pipe(
            map((data) =>
              data !== null ? LOGIN_SUCCESS(data) : LOGIN_FAILURE(data)
            )
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REGISTER),
      exhaustMap((action) =>
        this.authService.register(action as RegisterDTO).pipe(
          map((result) => {
            if (result) this.router.navigate(['/login']);

            return REGISTER_FINISH();
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGOUT),
      exhaustMap((_) =>
        this.authService
          .logout()
          .pipe(
            map((status) =>
              status === true ? LOGOUT_SUCCESS() : LOGOUT_FAILURE()
            )
          )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT_SUCCESS),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  setAuthStateFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SET_STATE_FROM_STORAGE),
      map(() => {
        const user = this.authService.getUserFromSession();

        return user !== null ? SET_STATE_SUCCESS(user) : SET_STATE_FAILURE();
      })
    )
  );
}
