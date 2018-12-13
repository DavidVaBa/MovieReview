import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NewReview } from '../../shared/models/NewReview';
import { Observable } from 'rxjs';
import { Constants } from '../../shared/classes/Constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: Http
  ) { }

  SendReview(body: NewReview): Observable<any> {
    return this.http.post(Constants.movieReviewAPIURL + 'Review/AddReview', body, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  DeleteReview(reviewId: string): Observable<any> {
    return this.http.delete(Constants.movieReviewAPIURL + 'Review/DeleteReview?reviewId=' + reviewId, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  GetReviews(movieId: number): Observable<any> {
    return this.http.get(Constants.movieReviewAPIURL + 'Review/GetReviews?movieId=' + movieId, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  GetReviewsByRange(range: number): Observable<any> {
    return this.http.get(Constants.movieReviewAPIURL + 'Review/GetReviewsbyDateRange?range=' + range, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }

  GetMovieScore(movieId: number): Observable<any> {
    return this.http.get(Constants.movieReviewAPIURL + 'Review/GetMovieScore?movieId=' + movieId, Constants.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Serve error'));
  }
}
