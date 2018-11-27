using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MovieReview.DL.DTO;
using MovieReview.DL.Models;
using System.IO;

namespace MovieReview.DB.Contexts
{
    public partial class MovieReviewContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
            var configuration = builder.Build();
            var conString = configuration.GetConnectionString("PlatformConnection");
            optionsBuilder.UseSqlServer(conString);
        }

        public MovieReviewContext()
        {

        }

        public virtual DbSet<UserDTO> User { get; set; }
        public virtual DbSet<Review> Review { get; set; }
    }
}
