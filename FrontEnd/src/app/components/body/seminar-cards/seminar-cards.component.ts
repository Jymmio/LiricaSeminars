import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { Card } from '../../../models/card.model';
import { DataService } from '../../../services/data.service';
import { PageHeadComponent } from '../../page-head/page-head.component';
import { SeminarService } from '../../../services/seminar.service';


@Component({
  selector: 'app-seminar-cards',
  standalone: true,
  imports: [CardComponent, CardDisplayComponent,  CommonModule, PageHeadComponent],
  templateUrl: './seminar-cards.component.html',
  styleUrl: './seminar-cards.component.scss'
})

export class SeminarCardsComponent implements OnInit{
  currentYear: number;
  constructor(private dataService: DataService,
    private seminarService: SeminarService){this.currentYear = new Date().getFullYear();}
  cards: Card[] = [];
  ngOnInit(): void {
    this.seminarService.getSeminarYear(this.currentYear).subscribe((res:any)=>{
      for(let i = 0; i < res.length; i++){
        this.cards.push(new Card(res[i].title, res[i].place, res[i].date, res[i].content));
      }

    }, (err) => {
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
    });
  }
}
