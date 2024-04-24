import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeminarCardsComponent } from './components/body/seminar-cards/seminar-cards.component';
import { LoginComponent } from './components/body/login/login.component';
import { SignupComponent } from './components/body/signup/signup.component';
import { NewSeminarComponent } from './components/body/new-seminar/new-seminar.component';
import { SearchedComponent } from './components/body/searched/searched.component';
import { AdminSettingsComponent } from './components/body/admin-settings/admin-settings.component';
import { HelpComponent } from './components/body/help/help.component';
import { PendingComponent } from './components/body/admin-settings/users/pending/pending.component';
import { ManageComponent } from './components/body/admin-settings/users/manage/manage.component';
import { ManageSeminarsComponent } from './components/body/admin-settings/manage-seminars/manage-seminars.component';
import { ManageSeminarComponent } from './components/body/help/manage-seminar/manage-seminar.component';
import { ManageWebsiteComponent } from './components/body/help/manage-website/manage-website.component';
import { HelpUserComponent } from './components/body/help/help-user/help-user.component';

export const routes: Routes = [
  {
    path: 'home',
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
  },
  {
    path: 'search',
    component: SearchedComponent
  },
  {
    path: 'settings',
    component: AdminSettingsComponent,
    children: [
      {
        path: 'pending-members',
        component: PendingComponent
      },
      {
        path: 'manage-members',
        component: ManageComponent
      },
      {
        path: '',
        component: PendingComponent
      }
    ]
  },
  {
    path: 'manage-seminars',
    component: ManageSeminarsComponent
  },
  {
    path: 'help',
    component: HelpComponent,
    children: [
      {
        path: 'manage-website',
        component: ManageWebsiteComponent
      },
      {
        path: 'create-seminar',
        component: ManageSeminarComponent
      },
      {
        path: 'user-help',
        component: HelpUserComponent
      }
    ]
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
