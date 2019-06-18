using MvcCodeRouting.Web.Http;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SignatureRequests.Controllers
{
    public class SignatureController : ApiController
    {
        #region GlobalVariables
        private readonly ISignatureManager _signatureManager;
        #endregion
        #region Constructor
        public SignatureController(ISignatureManager manager)
        {
            _signatureManager = manager;
        }
        #endregion
        #region API Methods
        // GET api/<controller>
        [Route("api/Signature/GetSignatures")]
        [HttpGet]
        public SignatureResponseList GetSignatures()
        {
            var signs = _signatureManager.GetSignatures();
            return signs;
        }
        [Route("api/Signature/AddSignature")]
        [HttpPost]
        public SignatureResponse AddSignature([FromBody]SignatureRequest me)
        {
            var result = _signatureManager.CreateSignatureEntity(me);
            return result;
        }
        [Route("api/Signature/UpdateSignature/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public SignatureResponse UpdateSignature([FromRoute]int id, [FromBody]SignatureRequest me)
        {
            var result = _signatureManager.UpdateSignature(id, me);
            return result;
        }
        //// DELETE api/<controller>/5
        [Route("api/Signature/DeleteSignature/{id}")]
        [HttpDelete]
        public void Delete([FromRoute]int id)
        {
            _signatureManager.Delete(id);
        }
        #endregion
    }
}