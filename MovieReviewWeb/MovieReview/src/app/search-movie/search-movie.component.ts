import { Component, OnInit } from '@angular/core';
import { TheMovieDbService } from '../services/the-movie-db/the-movie-db.service';
import { Constants } from '../shared/classes/Constants';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  movies = [];
  theMovieDBImagePath = Constants.theMovieDBImagePath;

  constructor(
    private theMovieDbService: TheMovieDbService
  ) { }

  ngOnInit() {
  }

  searchMovies(event: any) {
    this.theMovieDbService.SearchMovies(event.target.value).subscribe(
      (movies) => {
        this.movies = movies.results;
      }
    );
  }
}
