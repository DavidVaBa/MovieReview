import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedUserService } from '../services/account/logged-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'txtUsername': new FormControl(
      '',
      [Validators.required]
    ),
    'txtPassword': new FormControl(
      '',
      [Validators.required]
    )
  });

  constructor(
    private accountService: AccountService,
    private loggedUserService: LoggedUserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.accountService.Login(this.loginForm.get('txtUsername').value, this.loginForm.get('txtPassword').value).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response));
          this.loggedUserService.setUser(response.username, response.email, response.userid);
          this.router.navigate(['/home']);
        } else {
          localStorage.clear();
        }
      }
    );
  }

}
