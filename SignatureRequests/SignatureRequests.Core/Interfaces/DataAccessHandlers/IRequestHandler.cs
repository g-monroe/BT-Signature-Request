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
        RequestEntity GetById(int id);
        IEnumerable<RequestEntity> GetAllByFormId(int id);
        IEnumerable<RequestEntity> GetAllInclude();
    }
}
