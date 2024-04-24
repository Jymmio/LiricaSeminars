import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private userService: UserService){}
  isConnected: boolean = false;
  currentUser = new User("","","","","", "");
  statusColor: String = "";
  pendingMembersAmount: number = 0;
  isHelping: boolean = false;
  isHelpUser: boolean = false;
  isHelpWebsite: boolean = false;
  isHelpSeminar: boolean = false;
  setCurrentUser(user: User){
    this.currentUser = user;
  }
  setCurrentUserRole(newrole: string){
    this.currentUser.role = newrole;
  }
}
