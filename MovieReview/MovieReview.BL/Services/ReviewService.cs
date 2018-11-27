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
                    db.Review.Add((review));
                    db.SaveChanges();
                    return true;
                }
            } catch
            {
                return false;
            }
        }

        public IList<ReviewDTO> GetReviews(int movieId)
        {
            var reviews = new List<ReviewDTO>();

            using(var db = new MovieReviewContext())
            {
                var reviewsSearch = db.Review.Where(r => r.MovieId == movieId);

                foreach (Review review in reviewsSearch)
                {
                    var reviewDTO = new ReviewDTO();

                    reviewDTO.Comment = review.Comment;
                    reviewDTO.Score = review.Score;
                    reviewDTO.UserName = db.User.Where(u => u.UserId == review.UserId).FirstOrDefault().UserName;

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
                var score = 0;

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
    }
}
