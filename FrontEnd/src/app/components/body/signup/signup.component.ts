import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private userService: UserService,
    private  ngxUiLoaderService: NgxUiLoaderService,
    private router: Router){}
  form: FormGroup = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  signupAction(): void{
    this.ngxUiLoaderService.start();
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    const firstNameControl = this.form.get('firstName');
    const lastNameControl = this.form.get('lastName');
    var data = {
      lastName: "",
      firstName: "",
      email: "",
      password: ""
    }
    if (emailControl) {
      const email = emailControl.value;
      data.email = email;
    } else {
      console.log('Email control is not found');
    }
    if(passwordControl){
      const password = passwordControl.value;
      data.password = password;
    } else {
      console.log("Password control is not found");
    }
    if (firstNameControl) {
      const first = firstNameControl.value;
      data.firstName = first;
    } else {
      console.log('Email control is not found');
    }
    if(lastNameControl){
      const last = lastNameControl.value;
      data.lastName = last;
    } else {
      console.log("Password control is not found");
    }

    this.userService.signup(data).subscribe((res:any)=>{
      this.ngxUiLoaderService.stop();
      if(res?.message === "compte enregistré !"){
        this.router.navigate(['/home']);
      }

    }, (err) => {
      this.ngxUiLoaderService.stop();
      if(err.error?.message){
        console.log(err.error?.message);
      }
      else{
        console.log('une erreur est survenue.');
      }
    });
  }
}
