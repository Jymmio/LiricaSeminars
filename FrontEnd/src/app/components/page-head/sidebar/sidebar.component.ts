import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { NgIf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from '../../../models/user.model';
import { last } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports : [NgIf,CommonModule, RouterLink],
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = false;

  constructor(private sidebarService: SidebarService,
    public globalService: GlobalService,
    private ngx: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.sidebarService.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarVisible = isOpen;
    });
  }
  disconnect(): void{
    this.ngx.start();
    this.globalService.isConnected = false;
    this.globalService.setCurrentUser(new User("","","","","",""));
    this.globalService.statusColor = "";
    this.ngx.stop();
  }
}
