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
using UserRequests.Managers.Extensions;

namespace SignatureRequests.Controllers
{
    public class UserController : ApiController
    {
        #region GlobalVariables
        private readonly IUserManager _userManager;
        #endregion
       
        #region Constructor
        public UserController(IUserManager manager)
        {
            _userManager = manager;
        }
        #endregion

        #region API Methods
        // GET api/<controller>
        [Route("api/User/GetUsers")]
        public UserResponseList GetUsers()
        {
            var users = _userManager.GetAllInclude();
            var resp = UserExtension.UserToListResponse(users);
            return resp;
        }
        [Route("api/User/AddUser")]
        [HttpPost]
        public UserResponse AddUser([FromBody]UserRequest me)
        {
            var user =  UserExtension.UserToDbItem(me);
            var result = _userManager.CreateUserEntity(user);
            var resultValue = UserExtension.UserToListItem(result);
            return resultValue;
        }
        [Route("api/User/UpdateUser/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public UserResponse UpdateUser([FromRoute]int id, [FromBody]UserRequest me)
        {
            var user = UserExtension.UserToDbItem(me);
            var currentUser = _userManager.GetUser(id);
            var result =  _userManager.UpdateUser(currentUser, user);
            var resultValue = UserExtension.UserToListItem(result);
            return resultValue;
        }
        //// DELETE api/<controller>/5
        [Route("api/User/DeleteUser/{id}")]
        [HttpDelete]
        public void Delete([FromRoute]int id)
        {
            var currentUser =  _userManager.GetUser(id);
           _userManager.Delete(currentUser);
        }
        #endregion
    }
}