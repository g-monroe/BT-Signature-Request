using MvcCodeRouting.Web.Http;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Managers.RequestObjects;
using SignatureRequests.Managers.ResponseObjects;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace SignatureRequests.Controllers
{
    public class UserController : ApiController
    {
        #region GlobalVariables
        private readonly IUserManager _manager;
        #endregion

        #region Constructor
        public UserController(IUserManager manager)
        {
            _manager = manager;
        }
        #endregion

        #region API Methods
        // GET api/<controller>
        [Route("api/User/GetUsers")]
        public UserResponseList GetUsers()
        {
            var users = _manager.GetAllInclude();
            var resp = new UserResponseList
            {
                TotalResults = users.Count(),
                UsersList = users.Select(me => new UserResponse()
                {
                    Id = me.Id,
                    Signature = me.Signature,
                    SignatureId = me.SignatureId,
                    Email = me.Email,
                    Name = me.Name,
                    Initial = me.Initial,
                    InitialId = me.InitialId,
                    Password = me.Password,
                    Role = me.Role
                }).ToList()
            };

            return resp;
        }
        [Route("api/User/AddUser")]
        [HttpPost]
        public UserResponse AddUser([FromBody]UserRequest me)
        {
            var user = new UserEntity
            {
                Id = me.Id,
                Signature = me.Signature,
                SignatureId = me.SignatureId,
                Email = me.Email,
                Name = me.Name,
                Initial = me.Initial,
                InitialId = me.InitialId,
                Password = me.Password,
                Role = me.Role
            };
            var result = _manager.CreateUserEntity(user);
            var resultValue = new UserResponse()
            {
                Id = result.Id,
                Signature = result.Signature,
                SignatureId = result.SignatureId,
                Email = result.Email,
                Name = result.Name,
                Initial = result.Initial,
                InitialId = result.InitialId,
                Password = result.Password,
                Role = result.Role
            };
            return resultValue;
        }
        [Route("api/User/UpdateUser/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public async Task<UserResponse> UpdateUser([FromRoute]int id, [FromBody]UserRequest me)
        {
            var user = new UserEntity
            {
                Id = me.Id,
                Signature = me.Signature,
                SignatureId = me.SignatureId,
                Email = me.Email,
                Name = me.Name,
                Initial = me.Initial,
                InitialId = me.InitialId,
                Password = me.Password,
                Role = me.Role
            };
            var currentUser = await _manager.GetUser(id);
            var result =  _manager.UpdateUser(currentUser, user);
            var resultValue = new UserResponse()
            {
                Id = result.Id,
                Signature = result.Signature,
                SignatureId = result.SignatureId,
                Email = result.Email,
                Name = result.Name,
                Initial = result.Initial,
                InitialId = result.InitialId,
                Password = result.Password,
                Role = result.Role
            };
            return resultValue;
        }
        //// DELETE api/<controller>/5
        [Route("api/User/DeleteUser/{id}")]
        [HttpDelete]
        public async Task<bool> Delete([FromRoute]int id)
        {
            var currentUser = await _manager.GetUser(id);
            return _manager.Delete(currentUser);
        }
        #endregion
    }
}