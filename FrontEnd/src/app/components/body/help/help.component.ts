import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { RouterLink } from '@angular/router';
import { HelpUserComponent } from './help-user/help-user.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { ManageSeminarComponent } from './manage-seminar/manage-seminar.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterLink, HelpUserComponent, ManageWebsiteComponent, ManageSeminarComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent implements OnInit{
  isHelpUser: boolean = false;
  isHelpWebsite: boolean = false;
  isHelpSeminar: boolean = false;
  constructor(public gs: GlobalService){

  }
  ngOnInit(): void {
    this.gs.isHelpUser = false;
    this.gs.isHelpWebsite = false;
    this.gs.isHelpSeminar = false;
    this.gs.isHelping = false;
  }
  openHelpSeminar(){
    this.gs.isHelpUser = false;
    this.gs.isHelpWebsite = false;
    this.gs.isHelpSeminar = true;
    this.gs.isHelping = true;
  }
  openHelpWebsite(){
    this.gs.isHelpUser = false;
    this.gs.isHelpWebsite = true;
    this.gs.isHelpSeminar = false;
    this.gs.isHelping = true;
  }
  openHelpUser(){
    this.gs.isHelpUser = true;
    this.gs.isHelpWebsite = false;
    this.gs.isHelpSeminar = false;
    this.gs.isHelping = true;
  }
}
