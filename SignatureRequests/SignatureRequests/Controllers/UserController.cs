
using SignatureRequests.Core.Entities;
using SignatureRequests.Repositories;
using System.Collections.Generic;
using System.Web.Http;

namespace Angular4WebApi.Controllers
{
    public class UserController : ApiController
    {
        #region GlobalVariables
        private IUserRepository _repository;
        #endregion

        #region C'tor
        public UserController()
        {
            //_repository = new ProductRepository();
        }
        public UserController(IUserRepository repository)
        {
            _repository = repository;

            //if (repository == null)
            //{
            //    _repository = new ProductRepository();
            //}
            //else
            //{
            //    _repository = repository;
            //}
        }
        #endregion

        #region API Methods
        // GET api/<controller>
        [Route("api/User/GetUsers")]
        public IList<UserEntity> GetUsers()
        {
            return _repository.GetUsers();
        }
        // POST api/<controller>
        //public Product Post([FromBody]Product product)
        //{
        //    return _repository.Post(product);
        //}
        [Route("api/User/AddUser")]
        [HttpPost]
        /*
         {
	        "Name":"Milk",
	        "Category":"Dairy",
	        "Price":44
         }
        */
        public bool AddUser([FromBody]UserEntity product)
        {
            return _repository.AddUser(product);
        }
        [Route("api/User/UpdateUser")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public bool UpdateUser([FromBody]UserEntity p)
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