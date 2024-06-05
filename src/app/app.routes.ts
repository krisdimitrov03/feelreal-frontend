import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ManageProfileComponent } from './features/profile/components/manage-profile/manage-profile.component';
import { authGuard } from './features/auth/guards/auth.guard';

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
        path: 'profile',
        children: [
            {
                path: 'manage/:id',
                component: ManageProfileComponent
            }
        ],
        canActivate: [authGuard]
    }
];
