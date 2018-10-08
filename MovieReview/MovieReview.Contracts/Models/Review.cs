using System;
using System.Collections.Generic;
using System.Text;

namespace MovieReview.DL.Models
{
    public class Review
    {
        Guid Id { get; set; }
        Guid UserId { get; set; }
        Guid MovieId { get; set; }
        string Comment { get; set; }
        decimal Score { get; set; }
    }
}
