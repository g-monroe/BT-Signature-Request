using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IRequestHandler : IBaseHandler<RequestEntity>
    {
        RequestEntity GetRequestById(int id);
        IEnumerable<RequestEntity> GetAllInclude();
        IEnumerable<RequestEntity> GetAllBySignerId(int id);
    }
}
