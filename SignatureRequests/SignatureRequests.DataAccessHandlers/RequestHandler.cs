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
    public class RequestHandler : BaseHandler<RequestEntity>, IRequestHandler
    {
        public RequestHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<RequestEntity> GetAllById(int id)
        {
            return Get(s => s.Id == id);
        }
        public IEnumerable<RequestEntity> GetAllByFormId(int id)
        {
            return GetSelectIncludes(s => s.Id == id, "BoxEntities");
        }
        public IEnumerable<RequestEntity> GetAllInclude()
        {
            return GetIncludes("BoxEntities");
        }
    }
}
