import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  theMovieDBSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=87a71f0306c992ea4523f03ead93e8d7&language=en-US&query=';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http
  ) { }

  SearchMovies(movieQuery: string): Observable<any> {
    return this.http.get(this.theMovieDBSearchUrl + movieQuery, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }
}
