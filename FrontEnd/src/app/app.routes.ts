import { Routes } from '@angular/router';
import { SeminarCardsComponent } from './components/body/seminar-cards/seminar-cards.component';
import { LoginComponent } from './components/body/login/login.component';
import { SignupComponent } from './components/body/signup/signup.component';

export const routes: Routes = [
  {
    path: 'home',
    component: SeminarCardsComponent
  },
  {
    path: '',
    component: SeminarCardsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
