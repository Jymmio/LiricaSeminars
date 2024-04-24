import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { CardComponent } from '../../seminar-cards/card/card.component';
import { Card } from '../../../../models/card.model';
import { SeminarService } from '../../../../services/seminar.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardUpdateComponent } from './card-update/card-update.component';

@Component({
  selector: 'app-manage-seminars',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, CardUpdateComponent],
  templateUrl: './manage-seminars.component.html',
  styleUrl: './manage-seminars.component.scss'
})
export class ManageSeminarsComponent implements OnInit {
  cards: Card[] = [];

  constructor(public gs: GlobalService,
    private seminarService: SeminarService
  ){}
  ngOnInit(): void {
    this.seminarService.getSeminars().subscribe((res:any)=>{
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
  update(){

  }
  removeCard(i:number){
    this.cards.splice(i, 1);
  }
}
