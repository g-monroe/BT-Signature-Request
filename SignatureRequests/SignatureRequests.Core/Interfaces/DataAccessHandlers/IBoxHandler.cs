using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IBoxHandler : IBaseHandler<BoxEntity>
    {
        IEnumerable<BoxEntity> GetAllInclude();
         IEnumerable<BoxEntity> GetBoxesByFormId(int id);
        IEnumerable<BoxEntity> GetModelBoxesByFormId(int id);
        IEnumerable<BoxEntity> GetBoxesByRequestId(int id);
        void RemoveCollection(IEnumerable<BoxEntity> boxes);
    }
}
