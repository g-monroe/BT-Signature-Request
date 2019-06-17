using SignatureRequests.Core.Interfaces.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SignatureRequests.Core.Models;

namespace SignatureRequests.Controllers
{
    public class FormController : ApiController
    {
        private readonly IFormManager _formManager;

        public FormController()
        {

        }

        public FormController(IFormManager formManager)
        {
            _formManager = formManager;
        }

        // GET api/<controller>
        [Route("api/Form/GetForms")]
        public IList<FormJSON> GetForms()
        {
            return _formManager.GetForms();
        }

        [Route("api/Form/AddForm")]
        [HttpPost]
        public bool AddForm([FromBody]FormJSON form)
        {
            return _formManager.AddForm(form);
        }
        [Route("api/Form/UpdateForm")]
        [HttpPost]
        //POST:api/Product/UpdateProduct
        public bool UpdateForm([FromBody]FormJSON form)
        {
            return _formManager.UpdateForm(form);
        }
        // DELETE api/<controller>/5
        public bool Delete(int id)
        {
            return _formManager.Delete(id);
        }
    }
}



