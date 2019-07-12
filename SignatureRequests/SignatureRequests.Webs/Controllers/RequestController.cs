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
    public class RequestController : ApiController
    {
        #region GlobalVariables
        private readonly IRequestManager _requestManager;
        #endregion

        #region Constructor
        public RequestController(IRequestManager requestManager)
        {
            _requestManager = requestManager;
        }
        #endregion

        // GET api/<controller>
        [Route("api/Request/GetRequests")]
        public RequestResponseList GetRequests()
        {
            return _requestManager.GetRequests();
        }

        [Route("api/Request/GetRequestsById/{id}")]
        [HttpGet]
        public RequestResponse GetRequestById([FromRoute] int id)
        {
            return _requestManager.GetRequestById(id);
        }

        [Route("api/Request/AddRequest")]
        [HttpPost]
        public RequestResponse AddRequest([FromBody]RequestRequest request)
        {
            return _requestManager.AddRequest(request);
        }

        [Route("api/Request/UpdateRequest/{id}")]
        [HttpPost]
        public RequestResponse UpdateRequest([FromRoute] int id, [FromBody]RequestRequest request)
        {
            return _requestManager.EditRequest(id, request);

        }

        [Route("api/Request/DeleteRequest/{id}")]
        [HttpDelete]
        public void DeleteRequest([FromRoute]int id)
        {
            _requestManager.Delete(id);
        }

        [Route("api/Request/GetRequestByRequestId/{id}")]
        [HttpGet]
        public RequestToCompleteResponse GetRequestByRequestId([FromRoute] int id)
        {
            return _requestManager.GetRequestByRequestId(id);
        }
    }
}
