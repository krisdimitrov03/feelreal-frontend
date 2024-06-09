import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Profile, ProfileUpdateModel } from '../../../shared/models/Profile';
import { HttpClient } from '@angular/common/http';
import api from '../../../core/constants/api-url.constants';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/state';
import { SET_STATE_FROM_STORAGE } from '../../auth/store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient = inject(HttpClient);
  authService = inject(AuthService);

  constructor(private store: Store<AuthState>) {}

  getProfile(id: string | null): Observable<Profile> {
    return this.httpClient.get<Profile>(api.user.pure + id);
  }

  updateProfile(id: string, model: ProfileUpdateModel): Observable<boolean> {
    return this.httpClient
      .put<{ id: string; token: string }>(api.user.pure + id, model)
      .pipe(
        map((data) => data.token),
        map((token) => {
          this.authService.setSession(token);
          this.store.dispatch(SET_STATE_FROM_STORAGE());
          return true;
        }),
        catchError(() => of(false))
      );
  }

  deleteProfile(id: string): Observable<boolean> {
    return this.httpClient.delete<string>(api.user.pure + id).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
