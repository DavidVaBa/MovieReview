import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../../shared/classes/Constants';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  theMovieDBSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + Constants.theMovieDBAPiKey + '&language=en-US&query=';
  theMovieDBNowPlayingURL: string = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + Constants.theMovieDBAPiKey + '&language=en-US&page=1&region=US';
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

  GetNowPlayingMovies(): Observable<any> {
    return this.http.get(this.theMovieDBNowPlayingURL, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }
}
