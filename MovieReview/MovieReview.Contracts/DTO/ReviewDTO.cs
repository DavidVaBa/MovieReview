using System;
using System.Collections.Generic;
using System.Text;

namespace MovieReview.DL.DTO
{
    public class ReviewDTO
    {
        public int Score { get; set; }
        public string UserName { get; set; }
        public string Comment { get; set; }
        public int MovieId { get; set; }
    }
}
