import { Headers, RequestOptions } from '@angular/http';

export class Constants {
    public static movieReviewAPIURL = 'http://localhost:52208/api/';
    public static theMovieDBAPIRUL = 'https://api.themoviedb.org/3/';
    public static theMovieDBAPiKey = '87a71f0306c992ea4523f03ead93e8d7';
    public static theMovieDBImagePath = 'https://image.tmdb.org/t/p/w500';
    public static headers = new Headers({ 'Content-Type': 'application/json' });
    public static options = new RequestOptions({ headers: Constants.headers });
}
