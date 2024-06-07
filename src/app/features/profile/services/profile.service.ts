import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Profile, ProfileUpdateModel } from '../../../shared/models/Profile';
import { HttpClient } from '@angular/common/http';
import api from '../../../core/constants/api-url.constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient = inject(HttpClient);

  getProfile(id: string | null): Observable<Profile> {
    return this.httpClient.get<Profile>(api.user.pure + id);
  }

  updateProfile(id: string, model: ProfileUpdateModel): Observable<boolean> {
    return this.httpClient.put<string>(api.user.pure + id, model).pipe(
      map(() => true),
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
