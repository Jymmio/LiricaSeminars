import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../../models/user.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../../../../../services/user.service';
import { ReactiveFormsModule, FormGroup, FormControl, Form, FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../../../../services/global.service';
@Component({
  selector: 'app-user-pending',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-pending.component.html',
  styleUrl: './user-pending.component.scss'
})
export class UserPendingComponent implements OnInit{
  data = {
    role: "",
    email: ""
  }

  @Input() remove!: () => void;
  updateMessage: string = "";
  isConfirm: boolean = false;
  isError: boolean = false;
  isDeleted: boolean = false;
  isAdded: boolean = false;
  isAnimationAdded: boolean = false;
  statusColor: string = "";
  @Input() user!: User;
  constructor(private ngx: NgxUiLoaderService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private gs: GlobalService
  ){
  }

  isRoleConfirmed: boolean = true;
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      role: ['user']
    });
  }
  delete(){
    this.isConfirm = true;
    this.user.changeValue = "supprimer " + this.user.firstName + " " + this.user.lastName;
  }
  update(){
    const roleControl = this.form.get('role')?.value;
    this.data = {
      role: roleControl,
      email: this.user.email
    }
    this.isConfirm = true;
    this.user.changeValue="changer le role de " + this.user.firstName + " " + this.user.lastName + " en \"" + this.data.role + "\"";
  }
  confirmAgain(){
    if(this.user.changeValue.startsWith("changer le role")){
      this.userService.updateRole(this.data).subscribe((res:any) => {
        this.ngx.start();
        if(res.message !== "update complete"){
          this.updateMessage = "une erreur est survenue.";
          this.statusColor = "red";
          this.switchSuccess();
        }
        else{
          this.user.changeValue="changer le role de " + this.user.firstName + " " + this.user.lastName + " : " + this.data.role;
          this.remove();
        }
        this.ngx.stop();
      });
      this.gs.pendingMembersAmount--;
    }
    if(this.user.changeValue.startsWith("supprimer")){
      this.userService.deleteUser(this.user.email).subscribe((res:any) => {
        this.ngx.start();
        if(res.message !== "utilisateur supprimé"){
          this.updateMessage = res.message;
          this.statusColor = "red";
          this.isError = true;
          this.switchSuccess();
        }
        else{
          this.remove();
        }
        this.ngx.stop();
      });
      this.gs.pendingMembersAmount--;
    }
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
