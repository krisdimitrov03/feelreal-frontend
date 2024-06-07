import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { Profile } from '../../../../shared/models/Profile';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule,],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.sass',
})
export class ManageProfileComponent {
  profileService = inject(ProfileService);
  authService = inject(AuthService);

  profile$: Observable<Profile> | null = null;
  jobs$: Observable<any[]> = this.authService.getJobs();

  formValues: Profile | null = null;
  form: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.profile$ = this.profileService.getProfile(id);

      this.profile$?.subscribe((profile) => {
        this.formValues = {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          dateOfBirth: profile.dateOfBirth,
          jobId: profile.jobId,
        };

        this.form = new FormGroup({
          id: new FormControl(this.formValues?.id, Validators.required),
          username: new FormControl(this.formValues?.username, Validators.required),
          email: new FormControl(this.formValues?.email, Validators.required),
          firstName: new FormControl(
            this.formValues?.firstName,
            Validators.required
          ),
          lastName: new FormControl(this.formValues?.lastName, Validators.required),
          dateOfBirth: new FormControl(
            this.formValues?.dateOfBirth,
            Validators.required
          ),
          jobId: new FormControl(this.formValues.jobId, Validators.required),
        });
      });
    });
  }

  onSubmit() {
    const data = this.form?.value as Profile;

    this.profileService.updateProfile(data).subscribe((result) => {
      if (result) {
        alert('Profile updated successfully');
      } else {
        alert('Profile update failed');
      }
    });
  }
}
