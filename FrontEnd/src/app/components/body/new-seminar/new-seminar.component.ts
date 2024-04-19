import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
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
  constructor(public globalService: GlobalService,
    private ngx: NgxUiLoaderService,
    private router: Router,
    private seminarService: SeminarService
  ){}
  form = new FormGroup({
    language: new FormControl(''),
    title: new FormControl(''),
    orator: new FormControl(''),
    place: new FormControl(''),
    date: new FormControl(''),
    content: new FormControl('')
  })
  submitNewSeminar(){
    this.ngx.start();
    const titleControl = this.form.get('title');
    const dateControl = this.form.get('date');
    const placeControl = this.form.get('place');
    const oratorControl = this.form.get('orator');
    const languageControl = this.form.get('language');
    const contentControl = this.form.get('content');

    var data = {
      title: "",
      date: "",
      place: "",
      content: "",
      orator: "",
      language: ""
    }

    if(titleControl){
      const title = titleControl.value ?? "";
      data.title = title;
    }
    if(dateControl){
      const date = dateControl.value ?? "";
      data.date = date;
    }
    if(oratorControl){
      const orator = oratorControl.value ?? "";
      data.orator = orator;
    }
    if(languageControl){
      const languageText = languageControl.value ?? "";
      data.language = languageText;
    }
    if(placeControl){
      const place = placeControl.value ?? "";
      data.place = place;
    }
    if(contentControl){
      const content = contentControl.value ?? "";
      data.content = content;
    }
    this.seminarService.addSeminar(data).subscribe((res: any)=>{
      this.ngx.stop();
      if(res?.message === "Seminaire ajouté sans erreurs."){
        this.router.navigate(['/home']);
      }

    }, (err) => {
      this.ngx.stop();
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
    });
    //this.router.navigate(["/home"]);
    this.ngx.stop();
  }
}
