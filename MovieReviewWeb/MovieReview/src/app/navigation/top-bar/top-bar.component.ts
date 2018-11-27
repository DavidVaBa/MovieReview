import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from '../../services/account/logged-user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    constructor(
        private loggedUserService: LoggedUserService,
        private router: Router
    ) {}

    ngOnInit() { }

    isLogged() {
        if (localStorage['user'] !== undefined) {
            return false;
        } else {
            return true;
        }
    }

    logOut() {
        localStorage.clear();
        this.router.navigate(['/home']);
    }
}
