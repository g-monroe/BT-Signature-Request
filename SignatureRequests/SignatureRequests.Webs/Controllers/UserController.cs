using MvcCodeRouting.Web.Http;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
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
            return users;
        }


        [Route("api/User/AddUser")]
        [HttpPost]
        public UserResponse AddUser([FromBody]UserRequest me)
        {
            var result = _userManager.CreateUserEntity(me);
            return result;
        }

        [Route("api/User/UpdateUser/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public UserResponse UpdateUser([FromRoute]int id, [FromBody]UserRequest me)
        {
            var result = _userManager.UpdateUser(id, me);
            return result;
        }

        //// DELETE api/<controller>/5
        [Route("api/User/DeleteUser/{id}")]
        [HttpDelete]
        public void Delete([FromRoute]int id)
        {
            _userManager.Delete(id);
        }

        [Route("api/User/Verify")]
        [HttpPost]
        public UserResponse VerifyUser([FromBody]UserVerificationRequest me)
        {
            var result = _userManager.Verify(me);
            return result;
        }
        #endregion
    }
}