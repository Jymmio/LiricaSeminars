import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NgIf, CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports : [NgIf,CommonModule],
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarVisible = isOpen;
    });
  }
}
