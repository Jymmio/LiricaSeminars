import { Component, Input, OnInit} from '@angular/core';
import { NgIf, CommonModule} from '@angular/common';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-card-display',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.scss'
})
export class CardDisplayComponent implements OnInit {
  title!: String;
  place!: String;
  date!: String;
  content!: String;

  receivedData: String[] = [];
  isCardVisible: boolean = false;
  constructor(private dataService: DataService) {}
  toggleDisplayCard(){
    this.dataService.toggleDisplayCard();
  }
  ngOnInit(): void {
    this.dataService.isCardOpen$.subscribe(isOpen => {
      this.isCardVisible = isOpen;
    });
    this.dataService.getData().subscribe(data => {
      this.receivedData = data;
      this.title = this.receivedData[0];
      this.place = this.receivedData[1];
      this.date = this.receivedData[2];
      this.content = this.receivedData[3];
    });
  }
}
