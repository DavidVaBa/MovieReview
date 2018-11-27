import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Constants } from '../../shared/classes/Constants';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  constructor(
    private http: Http
  ) { }

  SearchMovies(movieQuery: string): Observable<any> {
    return this.http.get(Constants.theMovieDBAPIRUL + 'search/movie?api_key=' + Constants.theMovieDBAPiKey + '&language=en-US&query='
      + movieQuery, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  GetNowPlayingMovies(): Observable<any> {
    return this.http.get(Constants.theMovieDBAPIRUL + 'movie/now_playing?api_key=' + Constants.theMovieDBAPiKey
      + '&language=en-US&page=1&region=US', Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  GetMovie(movieId: string): Observable<any> {
    return this.http.get(Constants.theMovieDBAPIRUL + 'movie/' + movieId + '?api_key=' + Constants.theMovieDBAPiKey + '&language=en-US',
      Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }
}
