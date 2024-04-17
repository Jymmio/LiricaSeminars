import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<String[]>();
  private isCardOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCardOpen$: Observable<boolean> = this.isCardOpenSubject.asObservable();

  constructor() { }

  toggleDisplayCard(): void {
    const currentValue = this.isCardOpenSubject.getValue();
    this.isCardOpenSubject.next(!currentValue);
  }
  emitData(data: String[]) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}
