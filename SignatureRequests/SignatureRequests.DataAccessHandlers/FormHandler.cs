using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace SignatureRequests.DataAccessHandlers
{
    public class FormHandler : BaseHandler<FormEntity> , IFormHandler
    {
        public FormHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<FormEntity> GetAllById(int id)
        {
            return _context.Forms.Where(x => x.UserId == id).Include(form => form.User).Include(form => form.RequestEntities.Select(r => r.BoxEntities));
        }
        public IEnumerable<FormEntity> GetAllByUserId(int id)
        {
            return _context.Forms.Where(x =>x.UserId == id).Include(form => form.User).Include(form => form.RequestEntities.Select(r => r.BoxEntities));
        }

        public IEnumerable<FormEntity> GetAllInclude()
        {
            return _context.Forms.Include(form => form.User).Include(form => form.RequestEntities.Select(r => r.BoxEntities));

        }
    }
}
