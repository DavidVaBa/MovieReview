using Microsoft.AspNetCore.Mvc;
using MovieReview.BL.Services;
using MovieReview.DL.DTO;
using MovieReview.DL.Models;
using System;
using System.Collections.Generic;

namespace MovieReview.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly ReviewService _reviewService;

        public ReviewController()
        {
            _reviewService = new ReviewService();
        }

        [HttpPost]
        [Route("AddReview")]
        public IActionResult AddReview([FromBody]Review review)
        {
            try
            {
                if (_reviewService.AddReview(review))
                {
                    return this.Ok(new { success = true, message = "Review Added" });
                } else
                {
                    return this.Ok(new { success = false, message = "Review not Added" });
                }
            }
            catch (Exception e)
            {
                return this.Ok(new { success = false, message = e.Message });
            }
        }

        [HttpDelete]
        [Route("DeleteReview")]
        public IActionResult DeleteReview(Guid reviewId)
        {
            try
            {
                if (_reviewService.DeleteReview(reviewId))
                {
                    return this.Ok(new { success = true, message = "Review Deleted" });
                } else
                {
                    return this.Ok(new { success = false, message = "Review not Deleted" });
                }
            } catch (Exception e)
            {
                return this.Ok(new { success = false, message = e.Message });
            }
        }

        [HttpGet]
        [Route("GetReviews")]
        public IList<ReviewDTO> GetReviews(int movieId)
        {
            return _reviewService.GetReviews(movieId);
        }

        [HttpGet]
        [Route("GetReviewsbyDateRange")]
        public IList<ReviewDTO> GetReviewsByDateRange(int range)
        {
            return _reviewService.GetReviewsbByDateRange(range);
        }

        [HttpGet]
        [Route("GetMovieScore")]
        public double GetMovieScore (int movieId)
        {
            return _reviewService.GetMovieScore(movieId);
        }

        [HttpGet]
        [Route("GetTopMovies")]
        public dynamic GetTopMovies(string date, double range)
        {
            var dateNumbers = date.Split('-');
            DateTime dateTime = new DateTime(Int32.Parse(dateNumbers[0]), Int32.Parse(dateNumbers[1]), Int32.Parse(dateNumbers[2]));
            return _reviewService.GetTopMovies(dateTime, range);
        }
    }
}
