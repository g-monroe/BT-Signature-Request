
using System.Collections.Generic;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using System.Threading.Tasks;

namespace SignatureRequests.DataAccessHandlers
{
    public class GroupHandler : BaseHandler<GroupEntity>, IGroupHandler
    {
        public GroupHandler(SignatureRequestsContext context) : base(context)
        {
        }
    }
}