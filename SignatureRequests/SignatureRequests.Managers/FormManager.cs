using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class FormManager
    {
        private readonly IFormHandler _formHandler;

        public IList<FormJSON> GetForms()
        {
            return _formHandler.GetForms();
        }

        public bool AddForm(FormJSON form)
        {
            return _formHandler.AddForm(form);
        }
        //POST:api/Product/UpdateProduct
        public bool UpdateForm(FormJSON form)
        {
            return _formHandler.UpdateForm(form);
        }
        // DELETE api/<controller>/5
        public bool Delete(int id)
        {
            return _formHandler.Delete(id);
        }
    }
}