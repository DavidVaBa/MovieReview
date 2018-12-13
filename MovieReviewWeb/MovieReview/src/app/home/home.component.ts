import { Component, OnInit } from '@angular/core';
import { TheMovieDbService } from '../services/the-movie-db/the-movie-db.service';
import { Constants } from '../shared/classes/Constants';
import { ReviewService } from '../services/review/review.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    nowPlayingmovies = [];
    latestReviews = [];
    theMovieDBImagePath = Constants.theMovieDBImagePath;
    infoLoaded = false;

    constructor(
        private theMovieDbService: TheMovieDbService,
        private reviewService: ReviewService
    ) { }

    ngOnInit() {
        this.theMovieDbService.GetNowPlayingMovies().subscribe(
            (movies) => {
                this.nowPlayingmovies = movies.results.slice(0, 8);
                this.nowPlayingmovies.forEach((movie, index) => {
                    this.reviewService.GetMovieScore(movie.id).subscribe(
                        (score) => {
                            if (score === -1) {
                                movie.score = 'Not scored yet';
                            } else {
                                movie.score = score;
                            }

                            if (index === (this.nowPlayingmovies.length - 1)) {
                                this.getLatestReviews();
                            }
                        }
                    );
                });
            }
        );
    }

    getLatestReviews() {
        this.reviewService.GetReviewsByRange(7).subscribe(
            (reviews) => {
                this.latestReviews = reviews.slice(0, 10);
                this.latestReviews.forEach((review, index) => {
                    this.theMovieDbService.GetMovie(review.movieId).subscribe(
                        (movie) => {
                            review.movie = movie;
                            if (index === (this.latestReviews.length - 1)) {
                                this.infoLoaded = true;
                            }
                        }
                    );
                });
            }
        );
    }
}
