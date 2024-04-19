import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<String[]>();
  private dataSearch : Card[] = [];
  private isCardOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCardOpen$: Observable<boolean> = this.isCardOpenSubject.asObservable();

  constructor() {
  }


  toggleDisplayCard(): void {
    const currentValue = this.isCardOpenSubject.getValue();
    this.isCardOpenSubject.next(!currentValue);
  }
  emitData(data: String[]) {
    this.dataSubject.next(data);
  }
  setSearchData(data: Card[]){
    this.dataSearch = data;
  }
  getSearchData(){
    return this.dataSearch;
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
