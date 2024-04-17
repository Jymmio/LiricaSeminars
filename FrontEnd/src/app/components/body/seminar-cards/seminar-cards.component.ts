import { Component, OnInit} from '@angular/core';
import { NgIf, CommonModule} from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { Card } from '../../../models/card.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-seminar-cards',
  standalone: true,
  imports: [CardComponent, CardDisplayComponent, NgIf, CommonModule],
  templateUrl: './seminar-cards.component.html',
  styleUrl: './seminar-cards.component.scss'
})

export class SeminarCardsComponent implements OnInit{
  constructor(private dataService: DataService){}
  card1!:Card;
  card2!:Card;
  card3!:Card;
  card4!:Card;
  ngOnInit(): void {
    this.card1 = new Card(
      "Le meilleur titre",
      "New York City",
      "14h00",
      "the description of the best title ever existed in the planet of the universe calledd EAAARTH"
    );
    this.card2 = new Card(
      "Le meilleur titre 2",
      "New York City 2",
      "14h00 2",
      "the description of the best title ever existed in the planet of the universe calledd EAAARTH 2"
    );
    this.card3 = new Card(
      "Le meilleur titre 3",
      "New York City 3",
      "14h00 3",
      "the description of the best title ever existed in the planet of the universe calledd EAAARTH 3"
    );
    this.card4 = new Card(
      "Le meilleur titre 4",
      "New York City 4",
      "14h00 4",
      "the description of the best title ever existed in the planet of the universe calledd EAAARTH 4"
    );
  }
}
