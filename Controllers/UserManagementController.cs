using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VSCodeWebAPI.models;

namespace VSCodeWebAPI.Controllers
{
    [Route("UserManagement")]
    public class UserManagementController : Controller
    {
        [Route("")]
        [Route("Index")]
        [Route("/")] 
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
