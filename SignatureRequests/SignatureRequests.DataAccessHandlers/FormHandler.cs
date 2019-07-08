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
        public FormEntity GetByFormId(int id)
        {
            return _context.Forms.Where(x => x.Id == id).Include(form => form.User).Include(form => form.GroupEntities.Select(r => r.RequestEntities)).First();
        }
        public IEnumerable<FormEntity> GetAllByUserId(int id)
        {
            return _context.Forms.Where(x =>x.UserId == id).Include(form => form.User).Include(form => form.GroupEntities.Select(r => r.RequestEntities));
        }

        public IEnumerable<FormEntity> GetAllInclude()
        {
            return _context.Forms.Include(form => form.User).Include(form => form.GroupEntities.Select(r => r.RequestEntities));

        }
        public IEnumerable<FormEntity> GetRequested(int id)
        {
            return _context.Forms.Include(form => form.User).Include(x => x.GroupEntities.Select(r => r.RequestEntities.Select(u =>u.BoxEntities))).Where(g => g.GroupEntities.Where(t => t.RequestEntities.Where(r => r.SignerId == id).Any()).Any());
        }
    }
}
