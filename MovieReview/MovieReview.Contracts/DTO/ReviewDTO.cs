using System;
using System.Collections.Generic;
using System.Text;

namespace MovieReview.DL.DTO
{
    public class ReviewDTO
    {
        public double Score { get; set; }
        public string UserName { get; set; }
        public string Comment { get; set; }
        public int MovieId { get; set; }
        public DateTime Date { get; set; }
        public Guid ReviewId { get; set; }
    }
}
