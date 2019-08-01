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
    public class RequestHandler : BaseHandler<RequestEntity>, IRequestHandler
    {
        public RequestHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public RequestEntity GetRequestById(int id)
        {
            return _context.Requests.Include(r => r.BoxEntities).First();
        }
        public IEnumerable<RequestEntity> GetAllInclude()
        {
            return GetIncludes("BoxEntities");
        }
        public IEnumerable<RequestEntity> GetAllBySignerId(int id)
        {
            return Get(s => s.SignerId == id);
        }
        
    }
}
