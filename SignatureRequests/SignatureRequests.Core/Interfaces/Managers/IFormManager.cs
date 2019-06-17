using SignatureRequests.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IFormManager
    {
        IList<FormJSON> GetForms();

        bool AddForm(FormJSON form);

        bool UpdateForm(FormJSON form);

        bool Delete(int id);
    }
}
