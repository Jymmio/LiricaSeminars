import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})
export class PageHeadComponent {
  constructor(private sidebarService: SidebarService){}
  slideClick() : void{
    this.sidebarService.toggleSidebar();
  }
}
