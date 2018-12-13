using System;
using System.ComponentModel.DataAnnotations;

namespace MovieReview.DL.Models
{
    public class Review
    {
        [Key]
        public Guid ReviewId { get; set; }
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        public int MovieId { get; set; }
        public string Comment { get; set; }
        public int Score { get; set; }
    }
}
