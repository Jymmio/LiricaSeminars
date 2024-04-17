import { Component } from '@angular/core';
import { AdvancedSearchService } from '../../../services/advanced-search.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss'
})
export class AdvancedSearchComponent {
  isSearchbarVisible: boolean = false;

  constructor(private advancedSearchService: AdvancedSearchService) { }

  ngOnInit(): void {
    this.advancedSearchService.isAdvancedOpen$.subscribe(isOpen => {
      this.isSearchbarVisible = isOpen;
    });
  }

  Date1 : string = new Date().toLocaleDateString();

}
