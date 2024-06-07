import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Profile } from '../../../shared/models/Profile';
import { HttpClient } from '@angular/common/http';

let mockProfile: Profile = {
  id: '1',
  username: 'admin_user',
  email: 'admin@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('01/2/1990'),
  jobId: 'Product Manager',
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClient = inject(HttpClient);

  url = 'http://localhost:8080/api/users/';

  getProfile(id: string | null): Observable<Profile> {
    return this.httpClient.get<Profile>(this.url + id);
  }

  updateProfile(profile: Profile): Observable<boolean> {
    return this.httpClient.put<string>(this.url + profile.id, profile).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
