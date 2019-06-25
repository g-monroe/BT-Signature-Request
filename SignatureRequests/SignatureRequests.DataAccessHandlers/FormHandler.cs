using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.DataAccessHandlers
{
    public class FormHandler : BaseHandler<FormEntity> , IFormHandler
    {
        public FormHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<FormEntity> GetAllById(int id)
        {
            return Get(s => s.UserId == id);
        }

        public IEnumerable<FormEntity> GetAllInclude()
        {
            return _context.Forms.Include("User");

        }
    }
}
