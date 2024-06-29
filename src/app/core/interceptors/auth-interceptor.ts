import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../features/auth/store/state';
import { selectIsAuthenticated } from '../../features/auth/store/selectors/auth.selectors';
import { first, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const store = inject(Store<AuthState>);
  
  return store.select(selectIsAuthenticated).pipe(
    first(),
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        return next(req);
      }

      const token = authService.getToken();
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(authReq);
    })
  );
};
