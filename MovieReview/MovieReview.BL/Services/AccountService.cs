using MovieReview.DB.Contexts;
using MovieReview.DL.DTO;
using MovieReview.DL.Models;
using System;
using System.Linq;

namespace MovieReview.BL.Services
{
    public class AccountService
    {
        public bool AddUser(User newUser)
        {
            try
            {
                using(var db = new MovieReviewContext())
                {
                    var exisitingUser = db.User.FirstOrDefault(u => u.Email == newUser.Email || u.UserName == newUser.UserName);
                    if (exisitingUser == null)
                    {
                        var user = new UserDTO();
                        user.UserId = Guid.NewGuid();
                        user.Email = newUser.Email;
                        user.UserName = newUser.UserName;
                        db.User.Add(user);
                        db.SaveChanges();
                        return true;
                    } else
                    {
                        return false;
                    }
                }
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UserDTO GetUser(string username)
        {
            try
            {
                using(var db = new MovieReviewContext())
                {
                    return db.User.FirstOrDefault(u => u.UserName == username);
                }
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
