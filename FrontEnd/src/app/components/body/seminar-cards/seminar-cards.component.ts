import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { Card } from '../../../models/card.model';
import { DataService } from '../../../services/data.service';
import { PageHeadComponent } from '../../page-head/page-head.component';
import { SeminarService } from '../../../services/seminar.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from '../../../services/global.service';


@Component({
  selector: 'app-seminar-cards',
  standalone: true,
  imports: [CardComponent, CardDisplayComponent,  CommonModule, PageHeadComponent, ReactiveFormsModule],
  templateUrl: './seminar-cards.component.html',
  styleUrl: './seminar-cards.component.scss'
})

export class SeminarCardsComponent implements OnInit{
  currentYear: number;
  year: number;
  form = new FormGroup({
    chosenYear: new FormControl("")
  });
  constructor(private dataService: DataService,
    private seminarService: SeminarService,
    private fb: FormBuilder,
    private ngx: NgxUiLoaderService,
    public gs: GlobalService){
      this.currentYear = new Date().getFullYear();
      this.year = this.currentYear;
    }
  cards: Card[] = [];
  ngOnInit(): void {
    this.form = this.fb.group({
      chosenYear: [''+this.currentYear+'']
    });
    this.seminarService.getSeminarYear(""+this.currentYear).subscribe((res:any)=>{
      for(let i = 0; i < res.length; i++){
        this.cards.push(new Card(res[i].id, res[i].title, res[i].place, res[i].newdate, res[i].langue, res[i].content, res[i].orator));
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
  switchYear(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.year = parseInt(year);
    this.cards =  [];
    this.seminarService.getSeminarYear(year).subscribe((res:any)=>{
      this.ngx.start();
      for(let i = 0; i < res.length; i++){
        this.cards.push(new Card(res[i].id, res[i].title, res[i].place, res[i].newdate, res[i].langue, res[i].content, res[i].orator));
      }
      this.ngx.stop();
    }, (err) => {
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
      this.ngx.stop();
    });
  }
}
