import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { first } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/state';
import { RegisterDTO } from '../../../../shared/models/RegisterDTO';
import { REGISTER } from '../../store/actions/auth.actions';
import { AsyncPipe, NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  authService = inject(AuthService);

  jobs$ = this.authService.getJobs();

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    jobId: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required)
  });

  constructor(private store: Store<AuthState>) {}

  onSubmit() {
    const formData = this.form.value as (RegisterDTO & { confirmPassword: string });

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm password do not match');
      return;
    }
    
    this.store.dispatch(REGISTER(formData as RegisterDTO));
  }

}
