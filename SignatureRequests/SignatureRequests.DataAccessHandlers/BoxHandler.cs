
using System.Collections.Generic;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using System.Threading.Tasks;

namespace SignatureRequests.DataAccessHandlers
{
    public class BoxHandler : BaseHandler<BoxEntity>, IBoxHandler
    {
        public BoxHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<BoxEntity> GetAllInclude()
        {
            return _context.Boxes.Include("Request").Include("Signature");
        }
        public IEnumerable<BoxEntity> GetBoxesByRequestId(int id)
        {
            return Get(x =>x.RequestId == id);
        }

        public IEnumerable<BoxEntity> GetBoxesByFormId(int id)
        {
            return Get(x => x.FormId == id);
        }
        public IEnumerable<BoxEntity> GetModelBoxesByFormId(int id)
        {
            return Get(x => ((x.FormId == id) && (x.IsModel)));
        }
    }
}