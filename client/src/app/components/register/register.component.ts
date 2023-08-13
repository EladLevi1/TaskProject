import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  async register(registrationForm: NgForm) {
    if (registrationForm.valid) {
      const formData = registrationForm.value;

      const isDuplicateEmail = await this.userService.checkExistEmail(formData.email);
      const isDuplicateUsername = await this.userService.checkExistUsername(formData.username);

      if (isDuplicateEmail || isDuplicateUsername) {
        if (isDuplicateEmail){
          registrationForm.controls['email'].setErrors({ 'duplicate': true });
        }
        if (isDuplicateUsername){
          registrationForm.controls['username'].setErrors({ 'duplicate': true });
        }
        return;
      }

      const tempUser = new User(
        "1",
        formData.username,
        formData.fullname,
        formData.email,
        formData.password
      );

      this.userService.post(tempUser).subscribe((u) => {
        this.user = u as User;

        this.userService.login(formData.email, formData.password).subscribe(
          (data: any) => {
            this.userService.storeToken(data.token);
            this.router.navigate(['']);
          },
          (error) => {
            alert(error.error);
          }
        );
      });
    } else {
      alert('Invalid registration form!');
    }
  }
}