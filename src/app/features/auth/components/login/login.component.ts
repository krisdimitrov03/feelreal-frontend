import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginDTO } from '../../../../shared/models/LoginDTO';
import { Store } from '@ngrx/store';
import { LOGIN } from '../../../../features/auth/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private store: Store) {}

  onSubmit() {
    const formData = this.form.value as LoginDTO;

    this.store.dispatch(LOGIN(formData));
  }
}
