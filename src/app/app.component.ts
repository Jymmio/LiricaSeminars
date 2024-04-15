import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeadComponent } from './components/page-head/page-head.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageHeadComponent, SidebarComponent, AdvancedSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SeminairesLirica';
}
