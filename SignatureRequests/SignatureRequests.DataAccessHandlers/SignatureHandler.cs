
using System.Collections.Generic;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using System.Threading.Tasks;

namespace SignatureRequests.DataAccessHandlers
{
    public class SignatureHandler : BaseHandler<SignatureEntity>, ISignatureHandler
    {
        public SignatureHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<SignatureEntity> GetAllInclude()
        {
            return _context.Signatures.Include("User");

        }
    }
}