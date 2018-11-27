import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from './services/account/account.service';
import { LoggedUserService } from './services/account/logged-user.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReviewService } from './services/review/review.service';

@NgModule({
  declarations: [
    AppComponent,
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
    HttpModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule
  ],
  providers: [
    TheMovieDbService,
    AccountService,
    LoggedUserService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
