import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeminarService {
  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;
  updateSeminar(data: any){
    return this.httpClient.patch(this.url + "/seminar/update", data)
  }
  deleteSeminar(data: any){
    return this.httpClient.delete(this.url + "/seminar/delete", { params: data });
  }
  getSeminars(){
    return this.httpClient.get(this.url+"/seminar/getall");
  }
  getSeminarYear(annee: string) {
    return this.httpClient.get(this.url + '/seminar/get/year-' + annee);
  }
  getSeminarTitle(title: string) {
    return this.httpClient.get(this.url + '/seminar/get/title-' + title);
  }
  getSeminar(data: any) {
    let params = new HttpParams;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }
    return this.httpClient.get(this.url + '/seminar/get', { params: params })
  }
  addSeminar(data: any) {
    return this.httpClient.post(this.url +
      "/seminar/add", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

}
