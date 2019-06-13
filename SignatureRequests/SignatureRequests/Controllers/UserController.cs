using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Repositories;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace SignatureRequests.Controllers
{
    public class UserController : ApiController
    {
        #region GlobalVariables
        private IUserRepository _repository;
        #endregion

        #region Constructor
        public UserController()
        {
        }
        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }
        #endregion

        #region API Methods
        // GET api/<controller>
        [Route("api/User/GetUsers")]
        public IList<UserJSON> GetUsers()
        {
            return _repository.GetUsers();
        }
        [Route("api/User/AddUser")]
        [HttpPost]
        public bool AddUser([FromBody]UserJSON product)
        {
            return _repository.AddUser(product);
        }
        [Route("api/User/UpdateUser")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public bool UpdateUser([FromBody]UserJSON p)
        {
            return _repository.UpdateUser(p);
        }
        // DELETE api/<controller>/5
        public bool Delete(int id)
        {
            return _repository.Delete(id);
        }
        #endregion
    }
}