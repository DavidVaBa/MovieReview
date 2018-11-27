import { switchMap } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheMovieDbService } from '../services/the-movie-db/the-movie-db.service';
import { Constants } from '../shared/classes/Constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReviewService } from '../services/review/review.service';
import { NewReview } from '../shared/models/NewReview';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

    movieId;
    theMovieDBImagePath = Constants.theMovieDBImagePath;
    movie = {};
    movieReviews = [];
    movieScore;
    reviewScore = 5;
    reviewComment = '';
    modalRef: BsModalRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private theMovieDbService: TheMovieDbService,
        private modalService: BsModalService,
        private reviewService: ReviewService
    ) {}

    ngOnInit() {
        this.movieId = this.route.snapshot.paramMap.get('id');
        this.theMovieDbService.GetMovie(this.movieId).subscribe(
            (movie) => {
                this.movie = movie;
            }
        );

        this.reviewService.GetReviews(this.movieId).subscribe(
            (reviews) => {
                this.movieReviews = reviews;
                let scoreSum = 0;
                this.movieReviews.forEach(review => {
                    scoreSum += review.score;
                });
                this.movieScore = scoreSum / this.movieReviews.length;
            }
        );
    }

    openReviewModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    sendReview() {
        const user = JSON.parse(localStorage['user']);
        const review: NewReview = {
            MovieId: this.movieId,
            UserId: user.userid,
            Comment: this.reviewComment,
            Score: this.reviewScore
        };

        this.reviewService.SendReview(review).subscribe(
            (response) => {
                if (response.success) {
                    this.modalRef.hide();
                }
            }
        );
    }
}
