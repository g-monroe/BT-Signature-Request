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

namespace SignatureRequests.Webs.Controllers
{
    public class GroupController : ApiController
    {
        #region GlobalVariables
        private readonly IGroupManager _groupManager;
        #endregion

        #region Constructor
        public GroupController(IGroupManager groupManager)
        {
            _groupManager = groupManager;
        }
        #endregion

        // GET api/<controller>
        [Route("api/Group/GetGroups")]
        public GroupResponseList GetGroups()
        {
            return _groupManager.GetGroups();
        }

        [Route("api/Group/GetGroupById/{id}")]
        [HttpGet]
        public GroupResponseList GetGroupById([FromRoute] int id)
        {
            return _groupManager.GetGroupById(id);
        }
        [Route("api/Group/GetGroupByFormId/{id}")]
        [HttpGet]
        public GroupResponseList GetGroupByFormId([FromRoute] int id)
        {
            return _groupManager.GetGroupByFormId(id);
        }
        [Route("api/Group/AddGroup")]
        [HttpPost]
        public GroupResponse AddGroup([FromBody]GroupRequest group)
        {
            return _groupManager.AddGroup(group);
        }

        [Route("api/Group/UpdateGroup/{id}")]
        [HttpPost]
        public GroupResponse UpdateGroup([FromRoute] int id, [FromBody]GroupRequest group)
        {
            return _groupManager.EditGroup(id, group);

        }
        
        [Route("api/Group/DeleteGroup/{id}")]
        [HttpDelete]
        public void DeleteGroup([FromRoute]int id)
        {
            _groupManager.Delete(id);
        }
    }
}
