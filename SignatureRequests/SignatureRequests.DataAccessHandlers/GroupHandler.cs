
using System.Collections.Generic;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace SignatureRequests.DataAccessHandlers
{
    public class GroupHandler : BaseHandler<GroupEntity>, IGroupHandler
    {
        public GroupHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<GroupEntity> GetAllByFormId(int id)
        {
            return _context.Groups.Where(x => x.FormId == id).Include(form => form.FormEntity).Include(form => form.RequestEntities.Select(r => r.BoxEntities));
        }

        public IEnumerable<GroupEntity> GetAllInclude()
        {
            return _context.Groups.Include(form => form.FormEntity).Include(form => form.RequestEntities.Select(r => r.BoxEntities));

        }
    }
}