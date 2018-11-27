import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NewUser } from '../../shared/models/NewUser';
import { Observable } from 'rxjs';
import { Constants } from '../../shared/classes/Constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: Http
  ) { }

  SignUp(body: NewUser): Observable<any> {
    return this.http.post(Constants.movieReviewAPIURL + 'UserAccess/SignUp', body, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  Login(username: string, password: string): Observable<any> {
    return this.http.get(Constants.movieReviewAPIURL + 'UserAccess/Login?username=' + username + '&password=' + password, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }
}
