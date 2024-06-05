import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from '../../../shared/models/Profile';

let mockProfile: Profile = {
  id: '1',
  username: 'admin_user',
  email: 'admin@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('01/01/1990'),
  jobName: 'Product Manager'
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  getProfile() : Observable<Profile> {
    return of(mockProfile);
  }

  updateProfile(profile: Profile) : Observable<boolean> {
    mockProfile = profile;

    return of(true);
  }

  

}
