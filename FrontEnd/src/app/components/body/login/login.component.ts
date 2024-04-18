import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loginAction(): void {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('password');

    if (emailControl) {
      const email = emailControl.value;
      console.log("adresse mail : "+email);
    } else {
      console.log('Email control is not found');
    }
    if(passwordControl){
      const password = passwordControl.value;
      console.log("mot de passe : " + password);
    } else {
      console.log("Password control is not found");
    }
  }
}
