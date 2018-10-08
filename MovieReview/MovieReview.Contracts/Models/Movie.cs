using System;

namespace MovieReview.DL.Models
{
    public class Movie
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string ImageURL { get; set; }
        decimal Score { get; set; }
    }
}
