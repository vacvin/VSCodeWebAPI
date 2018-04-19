using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VSCodeWebAPI.models;

namespace VSCodeWebAPI.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserDataContext _UserDataContext;

        public UserController(UserDataContext userDataContext)
        {
            _UserDataContext = userDataContext;

            if (_UserDataContext.UserDatas.Count() == 0)
            {
                _UserDataContext.UserDatas.Add(new UserData { ID = 1,
                                                              Name = "Vacvin",
                                                              Birthday = DateTime.Parse("1982/01/01"),
                                                              CreateTime = DateTime.Now });
                _UserDataContext.SaveChanges();
            }
        }

        // GET api/User
        [HttpGet]
        public IEnumerable<UserData> GetAll()
        {
            return _UserDataContext.UserDatas.ToList();
        }

        // GET api/User/1
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(int id)
        {
            var item = _UserDataContext.UserDatas.FirstOrDefault(t => t.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        // POST api/User
        [HttpPost]
        public IActionResult Create([FromBody]UserData data)
        {
            if (data == null)
            {
                return BadRequest();
            }

            var item = _UserDataContext.UserDatas.OrderByDescending(x=> x.ID).FirstOrDefault();

            data.ID = item.ID + 1;
            data.CreateTime = DateTime.Now;

            _UserDataContext.UserDatas.Add(data);
            _UserDataContext.SaveChanges();

            return CreatedAtRoute("GetUser", new { id = data.ID }, data);
        }

        // PUT api/User/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserData data)
        {
            if (data == null || data.ID != id)
            {
                return BadRequest();
            }

            var _UserData = _UserDataContext.UserDatas.FirstOrDefault(t => t.ID == id);
            if (_UserData == null)
            {
                return NotFound();
            }

            _UserData.Name = data.Name;
            _UserData.Birthday = data.Birthday;

            _UserDataContext.UserDatas.Update(_UserData);
            _UserDataContext.SaveChanges();
            return new NoContentResult();
        }

        // DELETE api/User/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var _UserData = _UserDataContext.UserDatas.FirstOrDefault(t => t.ID == id);
            if (_UserData == null)
            {
                return NotFound();
            }

            _UserDataContext.UserDatas.Remove(_UserData);
            _UserDataContext.SaveChanges();
            return new NoContentResult();
        }
    }
}
