import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { redirectTo: 'home' },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { redirectTo: 'home' },
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];
