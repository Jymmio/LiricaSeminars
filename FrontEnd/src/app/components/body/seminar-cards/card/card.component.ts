import { Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  data: String[] = [];
  @Input() cardComponent!: Card;

  constructor(public dataService:DataService) {
  }
  ngOnInit(): void {
    this.data.push( this.cardComponent.title);
    this.data.push(this.cardComponent.place);
    this.data.push(this.cardComponent.date);
    this.data.push(this.cardComponent.content);
  }

  cardClick(): void{
    if(this.data.length != 0){
      this.dataService.emitData(this.data);
    }
    this.dataService.toggleDisplayCard();
  }
}
