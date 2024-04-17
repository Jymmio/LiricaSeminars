import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeadComponent } from './components/head/page-head/page-head.component';
import { SeminarCardsComponent } from './components/body/seminar-cards/seminar-cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageHeadComponent, SeminarCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SeminairesLirica';
}

