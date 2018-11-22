import { Component, OnInit } from '@angular/core';
import { TheMovieDbService } from '../services/the-movie-db/the-movie-db.service';
import { Constants } from '../shared/classes/Constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    nowPlayingmovies = [];
    theMovieDBImagePath = Constants.theMovieDBImagePath;

    constructor(
        private theMovieDbService: TheMovieDbService
    ) { }

    ngOnInit() {
        this.theMovieDbService.GetNowPlayingMovies().subscribe(
            (movies) => {
                this.nowPlayingmovies = movies.results.slice(0, 7);
            }
        );
    }
}
