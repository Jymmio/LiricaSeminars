import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;
  getUsers(){
    return this.httpClient.get(this.url + "/user/get-users");
  }
  updateUser(data: any){
    return this.httpClient.patch(this.url + "/user/update-user", data)
  }
  deleteUser(email: String){
    return this.httpClient.delete(this.url + "/user/delete-"+email);
  }
  updateRole(data: any){
    return this.httpClient.patch(this.url + "/user/change-role", data);
  }
  getPendingUsers(){
    return this.httpClient.get(this.url + "/user/pending-users");
  }

  login(data: any) {
    return this.httpClient.post(this.url +
      "/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  signup(data: any) {
    return this.httpClient.post(this.url +
      "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
