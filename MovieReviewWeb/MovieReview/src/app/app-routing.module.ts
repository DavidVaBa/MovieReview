import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'topmovies', component: TopMoviesComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'searchmovie', component: SearchMovieComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { useHash: false })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
