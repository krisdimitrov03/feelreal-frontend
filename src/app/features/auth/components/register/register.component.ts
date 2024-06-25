import { AfterViewInit, Component, inject, Renderer2 } from '@angular/core';
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
export class RegisterComponent implements AfterViewInit {
  authService = inject(AuthService);
  renderer = inject(Renderer2);

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

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    const height = document.querySelector('.unauthenticated-header')?.clientHeight as number;
    window.scrollTo(0, height);

    this.addPlaceholderHandlers();
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

  onSubmit() {
    const formData = this.form.value as (RegisterDTO & { confirmPassword: string });

    console.log(formData);
    
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm password do not match');
      return;
    }
    
    this.store.dispatch(REGISTER(formData as RegisterDTO));
  }
}
