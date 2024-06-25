import { AfterViewInit, Component, inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { Profile, ProfileUpdateModel } from '../../../../shared/models/Profile';
import { AuthService } from '../../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  styleUrls: ['./manage-profile.component.sass'],
})
export class ManageProfileComponent implements AfterViewInit {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  renderer = inject(Renderer2);

  profile$: Observable<Profile> | null = null;
  jobs$: Observable<any[]> = this.authService.getJobs();

  formValues: ProfileUpdateModel | null = null;
  form: FormGroup<FormControls> = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    jobId: new FormControl(null, Validators.required),
  });
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AuthState>,
    private router: Router
  ) {
    this.store.select(selectUser).subscribe((user) => {
      if (user === null) {
        this.router.navigate(['/login']);
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

          this.form.setValue({
            username: this.formValues.username,
            email: this.formValues.email,
            firstName: this.formValues.firstName,
            lastName: this.formValues.lastName,
            dateOfBirth: this.formValues.dateOfBirth,
            jobId: this.formValues.jobId,
          });

          this.addPlaceholderHandlers();
        });
      });
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    const height = document.querySelector('.unauthenticated-header')?.clientHeight as number;
    window.scrollTo(0, height);
  }

  addPlaceholderHandlers() {
    const inputs = document.querySelectorAll('.input-group input, .input-group select');
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        this.renderer.listen(input, 'focus', () => {
          input.placeholder = '';
        });

        this.renderer.listen(input, 'blur', () => {
          if (input.value === '') {
            setTimeout(() => {
              input.placeholder = input.getAttribute('name')?.replace(/([A-Z])/g, ' $1').trim() || '';
            }, 1000);
          }
        });
      }
    });
  }

  onUpdate() {
    const data = this.form?.value as ProfileUpdateModel;

    // Check if data is unchanged
    if (JSON.stringify(data) === JSON.stringify(this.formValues)) {
      console.log("No changes detected, skipping update.");
      return;
    }

    this.profileService.updateProfile(this.id as string, data).subscribe((result) => {
      if (result) {
        alert('Profile updated successfully');
      } else {
        alert('Profile update failed');
      }
    });
  }

  onDelete(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Delete button clicked");
    this.profileService.deleteProfile(this.id as string).subscribe((result) => {
      if (result) {
        console.log("Profile deleted successfully");
        this.store.dispatch(LOGOUT());
        this.router.navigate(['/login']);
      } else {
        console.log("Failed to delete profile");
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
