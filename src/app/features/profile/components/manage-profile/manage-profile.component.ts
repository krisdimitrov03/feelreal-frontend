import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { Profile } from '../../../../shared/models/Profile';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.sass',
})
export class ManageProfileComponent {
  profileService = inject(ProfileService);
  profile$: Observable<Profile> = this.profileService.getProfile();
}
