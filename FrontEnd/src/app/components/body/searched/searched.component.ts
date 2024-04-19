import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDisplayComponent } from '../seminar-cards/card-display/card-display.component';
import { CardComponent } from '../seminar-cards/card/card.component';
import { Card } from '../../../models/card.model';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [CardDisplayComponent, CardComponent, CommonModule],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.scss'
})
export class SearchedComponent {
  constructor(public dataService: DataService) { }
}
