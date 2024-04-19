import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeminarCardsComponent } from './components/body/seminar-cards/seminar-cards.component';
import { LoginComponent } from './components/body/login/login.component';
import { SignupComponent } from './components/body/signup/signup.component';
import { NewSeminarComponent } from './components/body/new-seminar/new-seminar.component';

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
  },
  {
    path: 'add-seminar',
    component: NewSeminarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
