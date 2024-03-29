﻿using MvcCodeRouting.Web.Http;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using SignatureRequests.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SignatureRequests.Controllers
{
    public class FormController : ApiController
    {
        #region GlobalVariables
        private readonly IFormManager _formManager;
        private readonly IBoxManager _boxManager;
        #endregion

        #region Constructor
        public FormController(IFormManager formManager, IBoxManager boxManager)
        {
            _formManager = formManager;
            _boxManager = boxManager;
        }
        #endregion

        // GET api/<controller>
        [Route ("api/Form/GetForms")]
        public FormResponseList GetForms()
        {
            return _formManager.GetForms();
        }

        [Route ("api/Form/GetFormById/{id}")]
        [HttpGet]
        public FormResponse GetFormById([FromRoute] int id)
        {
            return _formManager.GetFormById(id);
        }
        [Route("api/Form/GetFormsRequested/{id}")]
        [HttpGet]
        public FormResponseList GetFormsRequested([FromRoute] int id)
        {
            return _formManager.GetRequested(id);
        }
        [Route("api/Form/GetFormsByUserId/{id}")]
        [HttpGet]
        public FormResponseList GetFormsByUserId([FromRoute] int id)
        {
            return _formManager.GetFormsByUserId(id);
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
        [HttpPost, Route("api/Form/Upload/{id}")]
        public async Task<int> Upload([FromRoute] int id)
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            await _formManager.SaveDocumentAsync(provider, id);
            var numPages = _formManager.GetPageCount(provider, id);
            return numPages;
        }
        [Route("api/Form/DeleteForm/{id}")]
        [HttpDelete]
        public FormResponse DeleteForm([FromRoute]int id)
        {
            _formManager.DeleteDocument(id);

            return new FormResponse();
        }

    }
}
