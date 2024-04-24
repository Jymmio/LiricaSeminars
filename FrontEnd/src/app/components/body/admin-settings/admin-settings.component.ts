import { Component } from '@angular/core';
import { ManageComponent } from './users/manage/manage.component';
import { PendingComponent } from './users/pending/pending.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [ManageComponent, PendingComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent {
  constructor(public gs: GlobalService) { }
  isPending: boolean = true;
  isManageMembers: boolean = false;
  switchPending() {
    this.isPending = true;
    this.isManageMembers = false;
  }
  switchManageMembers(){
    this.isPending = false;
    this.isManageMembers = true;
  }
}
