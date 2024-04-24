import { Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Card } from '../../../../models/card.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  data: String[] = [];
  @Input() card!: Card;

  constructor(private dataService:DataService,
    public router: Router
  ) {
  }
  ngOnInit(): void {
    this.data.push(this.card.title);
    this.data.push(this.card.place);
    this.data.push(this.card.newdate);
    this.data.push(this.card.content);
    this.data.push(this.card.orator);
  }

  cardClick(): void{
    if(this.data.length != 0){
      this.dataService.emitData(this.data);
    }
    this.dataService.toggleDisplayCard();
  }
}
