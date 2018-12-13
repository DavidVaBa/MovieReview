using MovieReview.DB.Contexts;
using MovieReview.DL.DTO;
using MovieReview.DL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MovieReview.BL.Services
{
    public class ReviewService
    {
        public bool AddReview(Review review)
        {
            try
            {
                using (var db = new MovieReviewContext())
                {
                    review.ReviewId = Guid.NewGuid();
                    review.Date = DateTime.Now;
                    db.Review.Add((review));
                    db.SaveChanges();
                    return true;
                }
            } catch
            {
                return false;
            }
        }

        public bool DeleteReview(Guid reviewId)
        {
            try
            {
                using (var db = new MovieReviewContext())
                {
                    Review deleteReview = db.Review.Where(r => r.ReviewId == reviewId).FirstOrDefault();
                    db.Review.Remove(deleteReview);
                    db.SaveChanges();

                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public IList<ReviewDTO> GetReviews(int movieId)
        {
            var reviews = new List<ReviewDTO>();

            using(var db = new MovieReviewContext())
            {
                var reviewsSearch = db.Review.Where(r => r.MovieId == movieId).OrderBy(r => r.Date);

                foreach (Review review in reviewsSearch)
                {
                    var reviewDTO = new ReviewDTO();

                    reviewDTO.Comment = review.Comment;
                    reviewDTO.Score = review.Score;
                    reviewDTO.UserName = db.User.Where(u => u.UserId == review.UserId).FirstOrDefault().UserName;
                    reviewDTO.Date = review.Date;
                    reviewDTO.ReviewId = review.ReviewId;

                    reviews.Add(reviewDTO);
                }

                return reviews;
            }
        }

        public IList<ReviewDTO> GetReviewsbByDateRange(int range)
        {
            var reviews = new List<ReviewDTO>();
            var date = DateTime.Now.AddDays(-range);

            using (var db = new MovieReviewContext())
            {
                var reviewsSearch = db.Review.Where(r => r.Date >= date).OrderByDescending(r => r.Date);

                foreach (Review review in reviewsSearch)
                {
                    var reviewDTO = new ReviewDTO();

                    reviewDTO.Comment = review.Comment;
                    reviewDTO.Score = review.Score;
                    reviewDTO.UserName = db.User.Where(u => u.UserId == review.UserId).FirstOrDefault().UserName;
                    reviewDTO.MovieId = review.MovieId;
                    reviewDTO.Date = review.Date;
                    reviewDTO.ReviewId = review.ReviewId;

                    reviews.Add(reviewDTO);
                }

                return reviews;
            }
        }

        public double GetMovieScore(int movieId)
        {
            using(var db = new MovieReviewContext())
            {
                var reviewSearch = db.Review.Where(r => r.MovieId == movieId);
                double score = 0;

                foreach (Review review in reviewSearch)
                {
                    score += review.Score;
                }

                if (reviewSearch.Count() == 0)
                {
                    return -1;
                } else
                {
                    score /= reviewSearch.Count();
                    return score;
                }
            }
        }

        public IList<ReviewDTO> GetTopMovies(DateTime date, double range)
        {
            using (var db = new MovieReviewContext())
            {
                date = date.AddDays(-range);
                IList<ReviewDTO> topMovies = new List<ReviewDTO>();
                var reviews = db.Review.Where(r => r.Date.Date >= date.Date).GroupBy(r => r.MovieId).ToList();

                foreach (var group in reviews)
                {
                    ReviewDTO rdto = new ReviewDTO();
                    double scoreSum = 0;
                    foreach (var review in group)
                    {
                        scoreSum += review.Score;
                        rdto.MovieId = review.MovieId;
                    }
                    rdto.Score = scoreSum/group.Count();
                    topMovies.Add(rdto);
                }


                return topMovies;
            }
        }
    }
}
