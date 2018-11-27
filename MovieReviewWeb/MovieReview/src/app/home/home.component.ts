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
    theMovieDBImagePath = Constants.theMovieDBImagePath;

    constructor(
        private theMovieDbService: TheMovieDbService,
        private reviewService: ReviewService
    ) { }

    ngOnInit() {
        this.theMovieDbService.GetNowPlayingMovies().subscribe(
            (movies) => {
                this.nowPlayingmovies = movies.results.slice(0, 10);
                this.nowPlayingmovies.forEach(movie => {
                    this.reviewService.GetMovieScore(movie.id).subscribe(
                        (score) => {
                            if (score === -1) {
                                movie.score = 'Not scored yet';
                            } else {
                                movie.score = score;
                            }
                        }
                    );
                });
            }
        );
    }
}
