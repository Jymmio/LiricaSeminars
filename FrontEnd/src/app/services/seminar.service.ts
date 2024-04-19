import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeminarService {
  constructor(private httpClient: HttpClient) {}

  url = environment.apiUrl;

  getSeminarYear(annee:number){
    return this.httpClient.get(this.url+'/seminar/get/year-'+ annee);
  }
  getSeminarTitle(title: string) {
    return this.httpClient.get(this.url + '/seminar/get/title-' + title);
  }
  addSeminar(data: any){
    return this.httpClient.post(this.url +
      "/seminar/add", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

}
