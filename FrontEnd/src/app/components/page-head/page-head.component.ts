import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
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
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [SidebarComponent, AdvancedSearchComponent, RouterLink, ReactiveFormsModule, SearchedComponent, NgIf, CommonModule],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})
export class PageHeadComponent implements AfterViewInit{
  searchAnimation = true;
  isSidebarOpen: boolean = false;
  constructor(public sidebarService: SidebarService,
    private advancedSearchService: AdvancedSearchService,
    private ngx: NgxUiLoaderService,
    private seminaireService: SeminarService,
    private dataService: DataService,
    public globalService:GlobalService,
    private router: Router,
  ){}
  ngAfterViewInit(): void {
    this.sidebarService.isSidebarOpen$.subscribe((data) => {
      this.isSidebarOpen = data;
    })
    let color = document.querySelector("#status-circle");
    if(this.globalService.currentUser.status === "true"){
      color?.classList.add("green");
    }
    else if(this.globalService.currentUser.status === "false"){
      color?.classList.add("orange");
    }
    else{
      color?.classList.add("red");
    }
  }
  form = new FormGroup({
    search: new FormControl('')
  });
  slideClick() : void{
    this.sidebarService.toggleSidebar();
  }
  searchClick(): void{
    this.searchAnimation = !this.searchAnimation;
    const element = document.querySelector('#advanced-search-section');
    if (element){
      if(!this.searchAnimation){
        element.classList.remove('animate-leave');
        element.classList.add('animate-enter');
        this.advancedSearchService.toggleSearchBar();
      }
      else{
        element.classList.remove('animate-enter');
        element.classList.add('animate-leave');
        setTimeout(() => {
          this.advancedSearchService.toggleSearchBar();
        },300);
      }
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
    if(data.search !== ""){
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
    }else{
      this.router.navigate(["/home"]);
      this.ngx.stop();
    }
  }
}
