import { Component, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdvancedSearchService } from '../../services/advanced-search.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SeminarService } from '../../services/seminar.service';
import { DataService } from '../../services/data.service';
import { SearchedComponent } from '../body/searched/searched.component';


@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [SidebarComponent, AdvancedSearchComponent, RouterLink, ReactiveFormsModule, SearchedComponent],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})
export class PageHeadComponent {
  searchAnimation = true;

  constructor(private sidebarService: SidebarService, private advancedSearchService: AdvancedSearchService,
    private ngx: NgxUiLoaderService,
    private seminaireService: SeminarService,
    private dataService: DataService,
    private router: Router
  ){}
  form = new FormGroup({
    search: new FormControl('')
  });
  slideClick() : void{
    this.sidebarService.toggleSidebar();
  }
  searchClick(): void{
    this.advancedSearchService.toggleSearchBar();
    this.searchAnimation = !this.searchAnimation;
    const element = document.querySelector('#advanced-search-section');
    if (element){
      element.classList.toggle('animate-enter');
    }
  }
  submitSearch(){
    this.ngx.start();
    const searchControl = this.form.get("search");
    var data = {
      search: ""
    }
    if(searchControl){
      const searchText = searchControl.value ?? '';
      data.search = searchText;
    }
    this.seminaireService.getSeminarTitle(data.search).subscribe((res:any)=>{
      this.ngx.stop();
      var data = {
        title: '',
        date: '',
        place: '',
        content: ''
      }
      var bddResponse: any[] = [];
      for(let i = 0; i < res.length; i++){
        data=res[i];
        bddResponse.push(data);
      }
      this.dataService.setSearchData(bddResponse);
      this.router.navigate(["/search"]);
    }, (err) => {
      this.ngx.stop();
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
    });
  }
}
