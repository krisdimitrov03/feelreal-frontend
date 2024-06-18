import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { authGuard } from './core/guards/auth.guard';
import { CreateEventComponent } from './features/calendar/create-event/create-event.component';

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
    }
];
