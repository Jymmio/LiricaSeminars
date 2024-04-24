import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.scss'
})
export class UserManageComponent {
  @Input() remove!: () => void;
  updateMessage: string = "";

  isUpdated: boolean = false;
  isDeleted: boolean = false;

  isError: boolean = false;

  isAdded: boolean = false;
  isAnimationAdded: boolean = false;

  messageStatusColor: string = "";
  status: string = "";
  userStatusColor: string = "";
  @Input() user!: User;
  constructor(private ngx: NgxUiLoaderService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      status: [this.user.status],
      role: [this.user.role]
    });
    this.statusCheck();
  }
  delete() {
    this.userService.deleteUser(this.user.email).subscribe((res: any) => {
      this.ngx.start();
      if (res.message !== "utilisateur supprimé") {
        this.updateMessage = res.message;
        this.messageStatusColor = "red";
        this.isError = true;
        this.switchSuccess();
      }
      else {
        this.remove();
      }
      this.ngx.stop();
    });
  }
  update() {
    const firstNameControl = this.form.get('firstName')?.value;
    const lastNameControl = this.form.get('lastName')?.value;
    const emailControl = this.form.get('email')?.value;
    const statusControl = this.form.get('status')?.value;
    let statusControlConvert = "";
    if(statusControl==="Active"){
      statusControlConvert = "true";
    }
    else if(statusControl==="Pending"){
      statusControlConvert = "false";
    }
    const roleControl = this.form.get('role')?.value;
    let data: { [key: string]: any } = {};

    if(firstNameControl!==this.user.firstName && firstNameControl!==""){
      data['prenom'] = firstNameControl;
      this.user.firstName = firstNameControl;
    }
    if(lastNameControl!==this.user.lastName && lastNameControl!==""){
      data['nom'] = lastNameControl;
      this.user.lastName = lastNameControl;
    }
    if(emailControl!==this.user.email && emailControl!==""){
      data['email'] = emailControl;
      this.user.email = emailControl;
    }
    if(statusControlConvert!==this.user.status && statusControlConvert!==""){
      data['status'] = statusControlConvert;
      this.user.status = statusControlConvert;
    }
    if(roleControl!==this.user.role && roleControl!==""){
      data['role'] = roleControl;
      this.user.role = roleControl;
    }
    data['id'] = this.user.id;
    this.userService.updateUser(data).subscribe((res: any) => {
      this.ngx.start();
      if (res.message !== "update complete") {
        this.updateMessage = "une erreur est survenue.";
        this.messageStatusColor = "red";
        this.switchSuccess();
      }
      else {
        this.updateMessage = "Mise à jour réussie !";
        this.messageStatusColor = "green";
        this.switchSuccess();
        this.statusCheck();
        this.isUpdated = false;
      }
      this.ngx.stop();
    });
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async switchSuccess() {
    this.isAdded = true;
    this.isAnimationAdded = true;
    await this.sleep(2000);
    this.isAnimationAdded = false;
    setTimeout(() => {
      this.isAdded = false;
    }, 500);
  }
  statusCheck(){
    if (this.user.status === "true") {
      this.status = "Active";
      this.userStatusColor = "green";
    }
    else if (this.user.status === "false") {
      this.status = "Pending";
      this.userStatusColor = "orange";
    }
    else {
      this.status = "Inactive";
      this.userStatusColor = "red";
    }
  }
}
