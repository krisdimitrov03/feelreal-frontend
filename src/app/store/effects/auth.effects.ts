import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
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
} from '../actions/auth.actions';
import { exhaustMap, map, tap } from 'rxjs';
import { LoginDTO } from '../../shared/models/LoginDTO';
import { RegisterDTO } from '../../shared/models/RegisterDTO';
import { Router } from '@angular/router';

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
              data.status === true ? LOGIN_SUCCESS(data) : LOGIN_FAILURE(data)
            )
          )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(REGISTER),
      exhaustMap((action) =>
        this.authService
          .register(action as RegisterDTO)
          .pipe(map((_) => REGISTER_FINISH()))
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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
