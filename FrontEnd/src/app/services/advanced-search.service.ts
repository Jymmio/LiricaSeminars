import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  private isAdnvancedOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdvancedOpen$: Observable<boolean> = this.isAdnvancedOpenSubject.asObservable();

  constructor() { }

  toggleSearchBar(): void {
    const currentValue = this.isAdnvancedOpenSubject.getValue();
    this.isAdnvancedOpenSubject.next(!currentValue);
  }
}
