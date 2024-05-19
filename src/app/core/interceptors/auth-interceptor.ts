import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../features/auth/store/state';
import { selectIsAuthenticated } from '../../features/auth/store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  isAuth$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store<AuthState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isAuth$) return next.handle(req);

    const token = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq);
  }
}
