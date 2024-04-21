import { Component, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.loginAction();
  }



  emailErrorMessage: string = "";
  connexionErrorMessage: string = "";
  verifyEmail: boolean = false;
  verifyPassword: boolean = false;
  verifyConnexion: boolean = false;
  constructor(private userService: UserService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private router: Router,
    public globalService: GlobalService) { }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginAction(): void {
    this.verifyEmail = false;
    this.verifyPassword = false;
    this.verifyConnexion = false;
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');
    var data = {
      email: "",
      password: ""
    }

    if (emailControl) {
      const email = emailControl.value;
      data.email = email;
    }
    if (passwordControl) {
      const password = passwordControl.value;
      data.password = password;
    }

    if (this.validateEmail(data.email) && data.password.length >= 8) {
      this.ngxUiLoaderService.start();
      this.userService.login(data).subscribe((res: any) => {
        this.ngxUiLoaderService.stop();
        if (res?.message === "Connected") {
          this.globalService.isConnected = true;
          this.router.navigate(['/home']);
        }

      }, (err) => {
        this.ngxUiLoaderService.stop();
        if (err.error?.message) {
          this.verifyConnexion = true;
          this.connexionErrorMessage = err.error?.message;
          console.log(this.connexionErrorMessage);
        }
        else {
          this.verifyConnexion = true;
          this.connexionErrorMessage = 'une erreur est survenue.';
        }
      });
    }
    else {
      if (!this.validateEmail(data.email)) {
        this.verifyEmail = true;
        if (data.email === "") {
          this.emailErrorMessage = "Veuillez entrer votre mail *";
        }
        else {
          this.emailErrorMessage = "Votre adresse mail doit être sous forme \"nom@domaine.xy\"";
        }
      }
      else {
        this.verifyEmail = false;
      }
      if (data.password.length < 8) {
        this.verifyPassword = true;
      }
      else {
        this.verifyPassword = false;
      }
    }
  }
  validateEmail(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }
}
