import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './features/auth/store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './features/auth/store/effects/auth.effects';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { CalendarFeatureModule } from './features/calendar/calendar-feature.module';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      StoreModule.forRoot({
        auth: authReducer,
      }),
      EffectsModule.forRoot([AuthEffects]),
      CalendarFeatureModule,
      ReactiveFormsModule
    ),
  ],
};