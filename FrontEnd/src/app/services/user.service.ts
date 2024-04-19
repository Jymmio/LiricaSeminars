import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  login(data: any) {
    console.log(data);
    return this.httpClient.post(this.url +
      "/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  signup(data: any) {
    console.log(data);
    return this.httpClient.post(this.url +
      "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
