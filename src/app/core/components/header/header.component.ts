import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectToken } from '../../../features/auth/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { AuthState } from '../../../features/auth/store/state';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  token$: Observable<string | null>;

  constructor(private store: Store<AuthState>) {
    this.token$ = this.store.pipe(select(selectToken));
  }
}
