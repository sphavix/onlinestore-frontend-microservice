import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ShowcaseComponent } from './products/showcase/showcase.component';

export const routes: Routes = [
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'products/showcase', component: ShowcaseComponent },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];