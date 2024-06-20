import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../features/auth/store/state';
import { selectIsAuthenticated } from '../../../features/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.sass',
})
export class LandingComponent {
  constructor(router: Router, store: Store<AuthState>) {
    store
      .select(selectIsAuthenticated)
      .subscribe((auth) => auth && router.navigate(['/calendar']));
  }
}
