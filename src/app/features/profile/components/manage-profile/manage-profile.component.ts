import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { Profile, ProfileUpdateModel } from '../../../../shared/models/Profile';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthState } from '../../../auth/store/state';
import { Store } from '@ngrx/store';
import { LOGOUT } from '../../../auth/store/actions/auth.actions';
import { selectUser } from '../../../auth/store/selectors/auth.selectors';

type FormControls = {
  username: FormControl<any>;
  email: FormControl<any>;
  firstName: FormControl<any>;
  lastName: FormControl<any>;
  dateOfBirth: FormControl<any>;
  jobId: FormControl<any>;
};

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.sass',
})
export class ManageProfileComponent {
  profileService = inject(ProfileService);
  authService = inject(AuthService);

  profile$: Observable<Profile> | null = null;
  jobs$: Observable<any[]> = this.authService.getJobs();

  formValues: ProfileUpdateModel | null = null;
  form: FormGroup<FormControls> = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    dateOfBirth: new FormControl(null),
    jobId: new FormControl(null),
  });
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AuthState>,
    router: Router
  ) {
    this.store.select(selectUser).subscribe((user) => {
      if (user === null) {
        router.navigate(['/login']);
        return;
      }

      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');

        if (this.id !== user.id) this.id = user.id;

        this.profile$ = this.profileService.getProfile(this.id);

        this.profile$?.subscribe((profile) => {
          this.formValues = {
            username: profile.username,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            dateOfBirth: profile.dateOfBirth,
            jobId: profile.job.id,
          };

          this.form = new FormGroup({
            username: new FormControl(
              this.formValues?.username,
              Validators.required
            ),
            email: new FormControl(this.formValues?.email, Validators.required),
            firstName: new FormControl(
              this.formValues?.firstName,
              Validators.required
            ),
            lastName: new FormControl(
              this.formValues?.lastName,
              Validators.required
            ),
            dateOfBirth: new FormControl(
              this.formValues?.dateOfBirth,
              Validators.required
            ),
            jobId: new FormControl(this.formValues.jobId, Validators.required),
          });
        });
      });
    });
  }

  onUpdate() {
    const data = this.form?.value as ProfileUpdateModel;
    console.log(data);
    

    this.profileService
      .updateProfile(this.id as string, data)
      .subscribe((result) => {
        if (result) {
          alert('Profile updated successfully');
        } else {
          alert('Profile update failed');
        }
      });
  }

  onDelete() {
    this.profileService.deleteProfile(this.id as string).subscribe((result) => {
      if (result) {
        this.store.dispatch(LOGOUT());
      } else {
        alert('Cannot delete profile');
      }
    });
  }

  openModal() {
    const modal = document.querySelector('#deleteModal') as HTMLDivElement;
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.querySelector('#deleteModal') as HTMLDivElement;
    modal.style.display = 'none';
  }
}
