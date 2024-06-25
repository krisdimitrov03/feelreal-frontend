import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ManageProfileComponent } from './features/profile/components/manage-profile/manage-profile.component';
import { CalendarComponent } from './features/event/components/calendar/calendar.component';
import { authGuard } from './core/guards/auth.guard';
import { WellnessCheckPromptComponent } from './features/wellness-check/components/wellness-check-prompt/wellness-check-prompt.component';
import { CreateEventComponent } from './features/event/components/create-event/create-event.component';
import { LandingComponent } from './core/components/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'event',
    children: [
      {
        path: 'create',
        component: CreateEventComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'manage/:id',
        component: ManageProfileComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'wellness-check',
    component: WellnessCheckPromptComponent,
    canActivate: [authGuard],
  },
];
