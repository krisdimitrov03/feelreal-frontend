import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthState } from './features/auth/store/state';
import { Store } from '@ngrx/store';
import { SET_STATE_FROM_STORAGE } from './features/auth/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(store: Store<AuthState>) {
    store.dispatch(SET_STATE_FROM_STORAGE());
  }
}
