import { Component } from '@angular/core';
import { AdvancedSearchService } from '../../../services/advanced-search.service';
import { NgIf, CommonModule } from '@angular/common';
import { SeminarService } from '../../../services/seminar.service';
import { ReactiveFormsModule,FormGroup, FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.scss'
})
export class AdvancedSearchComponent {
  isSearchbarVisible: boolean = false;

  form = new FormGroup({
    language: new FormControl(''),
    title: new FormControl(''),
    orator: new FormControl(''),
    place: new FormControl(''),
    date: new FormControl('')
  });

  constructor(private advancedSearchService: AdvancedSearchService,
    private seminarService: SeminarService,
    private ngx: NgxUiLoaderService,
    private ds: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.advancedSearchService.isAdvancedOpen$.subscribe(isOpen => {
      this.isSearchbarVisible = isOpen;
    });
  }
  submitSearch(){
    const titleControl = this.form.get('title');
    const dateControl = this.form.get('date');
    const placeControl = this.form.get('place');
    const oratorControl = this.form.get('orator');
    const languageControl = this.form.get('language');
    interface Data {
      title?: string;
      newdate?: string;
      place?: string;
      orateur?: string;
      langue?: string;
    }
    var data : Data = {
    }

    if (titleControl) {
      const title = titleControl.value ?? "";
      if(title!==""){
        data.title = title;
      }
      else{
      }
    }
    if (dateControl) {
      const date = dateControl.value ?? "";
      if(date!==""){
        data.newdate = date;
      }
    }
    if (oratorControl) {
      const orator = oratorControl.value ?? "";
      if(orator!==""){
        data.orateur = orator;
      }
    }
    if (languageControl) {
      const languageText = languageControl.value ?? "";
      if (languageText !== "-" && languageText!=="") {
        data.langue = languageText;
      }
    }
    if (placeControl) {
      const place = placeControl.value ?? "";
      if(place!=="" && place!=="-"){
        data.place = place;
      }
    }
    this.ngx.start();
    this.seminarService.getSeminar(data).subscribe((res: any) => {
      this.ngx.start();
      this.ds.setSearchData(res);
      this.router.navigate(["/search"]);
      this.ngx.stop();

    }, (err) => {
      this.ngx.stop();
      if (err.error?.message) {
        console.log(err.error?.message);
      }
      else {
        console.log('une erreur est survenue.');
      }
    });
    this.ngx.stop();
  }

}
