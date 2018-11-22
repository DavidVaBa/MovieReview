import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { MovieComponent } from './movie/movie.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { TheMovieDbService } from './services/the-movie-db/the-movie-db.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    TopBarComponent,
    HomeComponent,
    TopMoviesComponent,
    MovieComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    SearchMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    TheMovieDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
