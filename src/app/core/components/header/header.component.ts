import {
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectId, selectUsername } from '../../../features/auth/store/selectors/auth.selectors';
import { AuthState } from '../../../features/auth/store/state';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LOGOUT } from '../../../features/auth/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  username$ = this.store.select(selectUsername);
  id$ = this.store.select(selectId);
  manageProfileLink = '';
  dropdownVisible = false;

  constructor(private store: Store<AuthState>) {
    this.id$.subscribe((id) => {
      this.manageProfileLink = `/profile/manage/${id}`;
    });
  }

  logout() {
    this.store.dispatch(LOGOUT());
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
