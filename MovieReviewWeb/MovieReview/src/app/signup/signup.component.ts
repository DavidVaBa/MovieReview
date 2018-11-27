import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewUser } from '../shared/models/NewUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    'txtUsername': new FormControl(
      '',
      [Validators.required]
    ),
    'txtEmail': new FormControl(
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp() {
    const user: NewUser = {
      Email: this.signUpForm.get('txtEmail').value,
      Password: this.signUpForm.get('txtPassword').value,
      Username: this.signUpForm.get('txtUsername').value
    };

    this.accountService.SignUp(user).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      }
    );
  }

}
