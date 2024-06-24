import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthState } from './features/auth/store/state';
import { Store } from '@ngrx/store';
import { SET_STATE_FROM_STORAGE } from './features/auth/store/actions/auth.actions';
import { selectIsAuthenticated } from './features/auth/store/selectors/auth.selectors';
import { Observable, map, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  isAuthenticated$ : Observable<boolean> = of(false);

  contentClass$ = this.store.select(selectIsAuthenticated).pipe(map(result => result ? 'content' : null));

  constructor(private store: Store<AuthState>) {
    store.dispatch(SET_STATE_FROM_STORAGE());
  }
}
