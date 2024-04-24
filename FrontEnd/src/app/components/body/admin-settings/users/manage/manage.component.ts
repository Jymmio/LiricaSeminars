import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/user.model';
import { UserManageComponent } from './user-manage/user-manage.component';
import { UserService } from '../../../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, UserManageComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit{
  isAdded: boolean = false;
  isAnimationAdded: boolean = false;
  statusColor: string = "";
  updateMessage: string = "";
  users: User[] = [];
  constructor(private userService: UserService,
    private ngx: NgxUiLoaderService
  ){}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res:any) => {
      this.ngx.start();
      for(let i=0; i<res.length; i++){
        this.users.push(new User(res[i].id, res[i].nom, res[i].prenom, res[i].email, res[i].role, res[i].status));
      }
      this.ngx.stop();
    })
  }

  removeUser(i: number){
    if(this.users[i].changeValue.startsWith("supprimer l'utilisateur")){
      this.statusColor = "green";
      this.updateMessage = "utilisateur supprimé avec succès !";
      this.switchSuccess();
    }
    else if(this.users[i].changeValue.startsWith("changer le role de ")){
      this.updateMessage = "le role à été attribué avec succès !";
      this.statusColor = "green";
      this.switchSuccess();
    }
    this.users.splice(i, 1);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async switchSuccess(){
    this.isAdded = true;
    this.isAnimationAdded = true;
    await this.sleep(2000);
    this.isAnimationAdded = false;
    setTimeout(() => {
      this.isAdded = false;
    }, 500);
  }
}
