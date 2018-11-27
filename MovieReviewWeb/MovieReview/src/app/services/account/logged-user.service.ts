import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  userName: string;
  email: string;
  userId: string;

  constructor() { }

  setUser(userName: string, email: string, userId: string) {
    this.userName = userName;
    this.email = email;
    this.userId = userId;
  }

  getUserName() {
    return this.userName;
  }
}
