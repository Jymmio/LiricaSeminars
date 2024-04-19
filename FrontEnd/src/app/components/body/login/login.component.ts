import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private userService: UserService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private router: Router,
    private globalService: GlobalService) { }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginAction(): void {
    this.ngxUiLoaderService.start();
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    var data = {
      email: "",
      password: ""
    }

    if (emailControl) {
      const email = emailControl.value;
      data.email = email;
    } else {
      console.log('Email control is not found');
    }
    if (passwordControl) {
      const password = passwordControl.value;
      data.password = password;
    } else {
      console.log("Password control is not found");
    }

    this.userService.login(data).subscribe((res: any) => {
      this.ngxUiLoaderService.stop();
      if (res?.message === "Connected") {
        this.globalService.isConnected = true;
        this.router.navigate(['/home']);
      }

    }, (err) => {
      this.ngxUiLoaderService.stop();
      if (err.error?.message) {
        console.log(err.error?.message);
      }
      else {
        console.log('une erreur est survenue.');
      }
    });
  }
}
