import { Component, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedSearchService } from '../../services/advanced-search.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [SidebarComponent, AdvancedSearchComponent, RouterLink],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})
export class PageHeadComponent {
  searchAnimation = true;
  constructor(private sidebarService: SidebarService, private advancedSearchService: AdvancedSearchService){}
  slideClick() : void{
    this.sidebarService.toggleSidebar();
  }
  searchClick(): void{
    this.advancedSearchService.toggleSearchBar();
    this.searchAnimation = !this.searchAnimation;
    const element = document.querySelector('#advanced-search-section');
    if (element){
      element.classList.toggle('animate-enter');
    }
  }
}
