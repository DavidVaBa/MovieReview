using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieReview.BL.Services;
using MovieReview.Data;
using MovieReview.DL.Models;
using System;
using System.Threading.Tasks;

namespace MovieReview.Controllers
{
    [Route("api/[controller]")]
    public class UserAccessController : Controller
    {
        private readonly AccountService _accountService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserAccessController(SignInManager<ApplicationUser> signInManager)
        {
            _accountService = new AccountService();
            this._signInManager = signInManager;
        }

        [HttpPost]
        [Route("SignUp")]
        public async Task<IActionResult> SignUp([FromBody]User user)
        {
            try
            {
                var appUser = new ApplicationUser()
                {
                    Email = user.Email,
                    UserName = user.UserName
                };
                if (_accountService.AddUser(user))
                {
                    var result = await this._signInManager.UserManager.CreateAsync(appUser, user.Password);
                    if (result.Succeeded)
                    {
                        return this.Ok(new { success = true, message = "User Added" });
                    } else
                    {
                        return this.Ok(new { success = false, message = "Username already used" });
                    }
                } else
                {
                    return this.Ok(new { success = false, message = "Email or username already used" });
                }
            } catch (Exception e)
            {
                return this.Ok(new { success = false, message = e.Message });
            }
        }

        [HttpGet]
        [Route("Login")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            try
            {
                var userLogin = await _signInManager.PasswordSignInAsync(userName, password, false, false);

                if (userLogin.Succeeded)
                {
                    var getUser = _accountService.GetUser(userName);
                    return this.Ok(new { success = true, email = getUser.Email, username = getUser.UserName, userid = getUser.UserId });
                } else
                {
                    return this.Ok(new { success = false, message = "The login failed" });
                }
            } catch (Exception e)
            {
                return this.Ok(new { success = false, message = e.Message });
            }
        }
    }
}
