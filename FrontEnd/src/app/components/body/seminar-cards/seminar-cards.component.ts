import { Component, OnInit} from '@angular/core';
import { NgIf, CommonModule} from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { Card } from '../../../models/card.model';
import { DataService } from '../../../services/data.service';
import { PageHeadComponent } from '../../page-head/page-head.component';
import { SeminarService } from '../../../services/seminar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-seminar-cards',
  standalone: true,
  imports: [CardComponent, CardDisplayComponent, NgIf, CommonModule, PageHeadComponent],
  templateUrl: './seminar-cards.component.html',
  styleUrl: './seminar-cards.component.scss'
})

export class SeminarCardsComponent implements OnInit{
  currentYear: number;
  constructor(private dataService: DataService,
    private seminarService: SeminarService,
    private ngxUiLoaderService: NgxUiLoaderService,){this.currentYear = new Date().getFullYear();}
  cards: Card[] = [];
  ngOnInit(): void {
    this.seminarService.getSeminar(this.currentYear).subscribe((res:any)=>{
      this.ngxUiLoaderService.stop();
      for(let i = 0; i < res.length; i++){
        this.cards.push(new Card(res[i].title, res[i].place, res[i].date, res[i].content));
      }

    }, (err) => {
      this.ngxUiLoaderService.stop();
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
    });
  }
}
