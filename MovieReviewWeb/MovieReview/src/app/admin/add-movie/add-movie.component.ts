import { Component, OnInit } from '@angular/core';
import { TheMovieDbService } from '../../services/the-movie-db/the-movie-db.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movies = [];
  theMovieDBImagePath = 'https://image.tmdb.org/t/p/w500';

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
