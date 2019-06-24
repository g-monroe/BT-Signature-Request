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
    public class FormController : ApiController
    {
        #region GlobalVariables
        private readonly IFormManager _formManager;
        #endregion

        #region Constructor
        public FormController(IFormManager formManager)
        {
            _formManager = formManager;
        }
        #endregion

        // GET api/<controller>
        [Route ("api/Form/GetForms")]
        public FormResponseList GetForms()
        {
            return _formManager.GetForms();
        }

        [Route ("api/Form/GetFormsById/{id}")]
        [HttpGet]
        public FormResponseList GetFormsById([FromRoute] int id)
        {
            return _formManager.GetFormsById(id);
        }
        [Route("api/Form/GetFormsByUserId/{id}")]
        [HttpGet]
        public FormResponseList GetFormsByUserId([FromRoute] int id)
        {
            return _formManager.GetFormsByUserId(id);
        }
        [Route("api/Form/GetFormsWithRequestsByUserId/{id}")]
        [HttpGet]
        public FormRequestResponseList GetFormsWithRequestsByUserId([FromRoute] int id)
        {
            return _formManager.GetFormsWithRequestsByUserId(id);
        }
        [Route("api/Form/AddForm")]
        [HttpPost]
        public FormResponse AddForm([FromBody]FormRequest form)
        {
            return _formManager.AddForm(form);
        }

        [Route("api/Form/UpdateForm/{id}")]
        [HttpPost]
        public FormResponse UpdateForm([FromRoute] int id, [FromBody]FormRequest form)
        {
            return _formManager.EditForm(id, form);
            
        }

        [Route("api/Form/DeleteForm/{id}")]
        [HttpDelete]
        public void DeleteForm([FromRoute]int id)
        {
            _formManager.Delete(id);
        }
    }
}
