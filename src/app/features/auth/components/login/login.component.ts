import { AfterViewInit, Component, inject, Renderer2 } from '@angular/core';
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
import { AuthState } from '../../store/state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements AfterViewInit {
  authService = inject(AuthService);
  renderer = inject(Renderer2);

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
    const formData = this.form.value as LoginDTO;
    this.store.dispatch(LOGIN(formData));
  }
}
