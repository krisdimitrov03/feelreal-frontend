import {
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsername } from '../../../features/auth/store/selectors/auth.selectors';
import { AuthState } from '../../../features/auth/store/state';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  username$ = this.store.select(selectUsername);

  constructor(private store: Store<AuthState>) {
  }
}
