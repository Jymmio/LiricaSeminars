import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../../../../models/card.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../seminar-cards/card/card.component';
import { SeminarService } from '../../../../../services/seminar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-card-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardComponent],
  templateUrl: './card-update.component.html',
  styleUrl: './card-update.component.scss'
})
export class CardUpdateComponent implements OnInit{
  @Input() remove!: () => void;
  @Input() card!: Card;
  form!: FormGroup;

  isAdded: boolean = false;
  isAnimationAdded: boolean = false;

  isUpdated: boolean = false;
  updateMessage: string = "";
  messageStatusColor: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private seminarService: SeminarService,
    private ngx: NgxUiLoaderService){}

  ngOnInit(): void {
    console.log(this.card.language);
    this.form = this.formBuilder.group({
      title: this.card.title,
      orateur: this.card.orator,
      langue: this.card.language,
      place: this.card.place,
      content: this.card.content
    });
  }
  update(){
    let data: {[key: string]: any} = {};
    let titleControl = this.form.get('title')?.value;
    let orateurControl = this.form.get('orateur')?.value;
    let langueControl = this.form.get('langue')?.value;
    let placeControl = this.form.get('place')?.value;
    let contentControl = this.form.get('content')?.value;
    if(titleControl!==this.card.title && titleControl!==""){
      data['title'] = titleControl;
      this.card.title = titleControl;
    }
    if(orateurControl!==this.card.orator && orateurControl!==""){
      data['orateur'] = orateurControl;
      this.card.orator = orateurControl;
    }
    if(langueControl!==this.card.language && langueControl!==""){
      data['langue'] = langueControl;
      this.card.language = langueControl;
    }
    if(placeControl!==this.card.place && placeControl!==""){
      data['place'] = placeControl;
      this.card.place = placeControl;
    }
    if(contentControl!==this.card.content && contentControl!==""){
      data['content'] = contentControl;
      this.card.content = contentControl;
    }
    data['id'] = this.card.id;
    this.seminarService.updateSeminar(data).subscribe((res: any)=>{
      this.ngx.start();
      if (res.message !== "update complete") {
        this.updateMessage = "une erreur est survenue.";
        this.messageStatusColor = "red";
        this.switchSuccess();
      }
      else {
        this.updateMessage = "Mise à jour réussie !";
        this.messageStatusColor = "green";
        this.switchSuccess();
        this.isUpdated = false;
      }
      this.ngx.stop();
    });
  }
  delete(){
    let titleControl = this.form.get('title')?.value;
    let orateurControl = this.form.get('orateur')?.value;
    let langueControl = this.form.get('langue')?.value;
    let placeControl = this.form.get('place')?.value;
    let contentControl = this.form.get('content')?.value;
    let data = {
      title: titleControl,
      orateur: orateurControl,
      langue: langueControl,
      place: placeControl,
      content: contentControl
    }
    console.log(data);
    this.seminarService.deleteSeminar(data).subscribe((res:any) => {
      this.ngx.start();
      if(res.message!=="séminaire supprimé"){
        this.updateMessage = res.message;
        this.messageStatusColor = "red";
        this.switchSuccess();
      }
      else{
        this.remove();
      }
      this.ngx.stop();
    });
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async switchSuccess() {
    this.isAdded = true;
    this.isAnimationAdded = true;
    await this.sleep(2000);
    this.isAnimationAdded = false;
    setTimeout(() => {
      this.isAdded = false;
    }, 500);
  }
}
