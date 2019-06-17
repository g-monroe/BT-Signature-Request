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
            var resp = _signatureManager.SignatureToListResponse(signs);
            return resp;
        }
        [Route("api/Signature/AddSignature")]
        [HttpPost]
        public SignatureResponse AddSignature([FromBody]SignatureRequest me)
        {
            var user = _signatureManager.SignatureToDbItem(me);
            var result = _signatureManager.CreateSignatureEntity(user);
            var resultValue = _signatureManager.SignatureToListItem(result);
            return resultValue;
        }
        [Route("api/Signature/UpdateSignature/{id}")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public SignatureResponse UpdateSignature([FromRoute]int id, [FromBody]SignatureRequest me)
        {
            var user = _signatureManager.SignatureToDbItem(me);
            var currentSignature = _signatureManager.GetSignature(id);
            var result = _signatureManager.UpdateSignature(currentSignature, user);
            var resultValue = _signatureManager.SignatureToListItem(result);
            return resultValue;
        }
        //// DELETE api/<controller>/5
        [Route("api/Signature/DeleteSignature/{id}")]
        [HttpDelete]
        public void Delete([FromRoute]int id)
        {
            var currentSignature = _signatureManager.GetSignature(id);
            _signatureManager.Delete(currentSignature);
        }
        #endregion
    }
}
