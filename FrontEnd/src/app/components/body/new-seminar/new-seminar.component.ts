import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SeminarService } from '../../../services/seminar.service';

@Component({
  selector: 'app-new-seminar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './new-seminar.component.html',
  styleUrl: './new-seminar.component.scss'
})
export class NewSeminarComponent {
  isAdded: boolean = false;
  isAddedAnimation: boolean = false;
  verifyTitle: boolean = false;
  verifyOrator: boolean = false;
  verifyLanguage: boolean = false;
  verifyPlace: boolean = false;
  verifyDate: boolean = false;
  verifyTime: boolean = false;
  verifyContent: boolean = false;
  constructor(public globalService: GlobalService,
    private ngx: NgxUiLoaderService,
    private router: Router,
    private seminarService: SeminarService
  ) { }
  form = new FormGroup({
    language: new FormControl(''),
    title: new FormControl(''),
    orator: new FormControl(''),
    place: new FormControl(''),
    date: new FormControl(''),
    hour: new FormControl(''),
    content: new FormControl('')
  })
  async submitNewSeminar() {
    const titleControl = this.form.get('title');
    const dateControl = this.form.get('date');
    const hourControl = this.form.get('hour');
    const placeControl = this.form.get('place');
    const oratorControl = this.form.get('orator');
    const languageControl = this.form.get('language');
    const contentControl = this.form.get('content');
    this.isAdded = false;
    this.isAddedAnimation = false;
    var tempData = {
      title: "",
      date: "",
      hour: "",
      place: "",
      content: "",
      orator: "",
      language: ""
    }

    if (titleControl) {
      const title = titleControl.value ?? "";
      tempData.title = title;
    }
    if (dateControl) {
      const date = dateControl.value ?? "";
      tempData.date = date;
    }
    if (hourControl){
      const hour = hourControl.value ?? "";
      tempData.hour = hour;
    }
    if (oratorControl) {
      const orator = oratorControl.value ?? "";
      tempData.orator = orator;
    }
    if (languageControl) {
      const languageText = languageControl.value ?? "";
      if (languageText !== "-") {
        tempData.language = languageText;
      }
      else {
        tempData.language = "";
      }
    }
    if (placeControl) {
      const place = placeControl.value ?? "";
      tempData.place = place;
    }
    if (contentControl) {
      const content = contentControl.value ?? "";
      tempData.content = content;
    }
    if (tempData.title !== "" && tempData.place !== "" && tempData.date !== "" && tempData.hour !== "" && tempData.orator !== "" && tempData.language !== "" && tempData.place !== "") {
      var completeDate = tempData.date + " " + tempData.hour;
      var data = {
        title: tempData.title,
        date: completeDate,
        place: tempData.place,
        content: tempData.content,
        orator: tempData.orator,
        language: tempData.language
      }
      this.seminarService.addSeminar(data).subscribe((res: any) => {
        this.ngx.start();
        if (res?.message === "Seminaire ajouté sans erreurs.") {
          this.ngx.stop();
          this.switchSuccess();
        }

      }, (err) => {
        this.ngx.stop();
        if (err.error?.message) {
          console.log(err.error?.message);
        }
        else {
          console.log('une erreur est survenue.');
        }
      });
    }
    else {
      if (tempData.title === "") {
        this.verifyTitle = true
      }
      else{
        this.verifyTitle = false;
      }
      if(tempData.content === "") {
        this.verifyContent = true;
      }
      else{
        this.verifyContent = false;
      }
      if (tempData.place === "") {
        this.verifyPlace = true
      }
      else{
        this.verifyPlace = false;
      }
      if(tempData.orator === "") {
        this.verifyOrator = true;
      }
      else{
        this.verifyOrator = false;
      }
      if (tempData.date === "") {
        this.verifyDate = true
      }
      else{
        this.verifyDate = false;
      }
      if(tempData.hour === "") {
        this.verifyTime = true;
      }
      else{
        this.verifyTime = false;
      }
      if(tempData.language === "") {
        this.verifyLanguage = true;
      }
      else{
        this.verifyLanguage = false;
      }
    }
    this.ngx.stop();
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async switchSuccess(){
    this.isAdded = true;
    this.isAddedAnimation = true;
    await this.sleep(2000);
    this.isAddedAnimation = false;
    setTimeout(() => {
      this.isAdded = false;
    }, 500);
  }
}
