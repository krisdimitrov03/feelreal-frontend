import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ManageProfileComponent } from './features/profile/components/manage-profile/manage-profile.component';
import { CalendarComponent } from './features/event/components/calendar/calendar.component';
import { authGuard } from './core/guards/auth.guard';

import { CreateEventComponent } from './features/event/components/create-event/create-event.component';
import { WellnessCheckPromptComponent } from './features/wellness-check/components/wellness-check-prompt/wellness-check-prompt.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'createEvent', 
        component: CreateEventComponent, 
        canActivate: [authGuard]
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
