import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from './services/account/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private loggedUserService: LoggedUserService
  ) {}

  title = 'app';

  ngOnInit() {
    if (localStorage['user'] !== undefined) {
      const user = JSON.parse(localStorage['user']);
      this.loggedUserService.setUser(user.username, user.email, user.userId);
    }
  }
}
