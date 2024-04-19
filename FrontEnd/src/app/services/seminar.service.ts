import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeminarService {
  constructor(private httpClient: HttpClient) {}

  url = environment.apiUrl;

  getSeminar(annee:number){
    console.log(this.url+'/seminar/get/year-'+ annee);
    return this.httpClient.get(this.url+'/seminar/get/year-'+ annee);
  }
  addSeminar(data: any){
    return this.httpClient.post(this.url +
      "/seminar/add", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
