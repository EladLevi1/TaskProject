import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title =  'Welcome'

  ismenurequired: boolean = false;

  constructor(private userService: UserService){}

  ngDoCheck(): void {
    if (this.userService.getToken() != null) {
      this.ismenurequired = true;
    }
    else{
      this.ismenurequired = false;
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

}
