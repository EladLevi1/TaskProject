import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router){}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (data: any) => {
        this.userService.storeToken(data.token);
        this.router.navigate(['']);
      },
      error => {
        alert(error.error);
      }
    );
  }
}
