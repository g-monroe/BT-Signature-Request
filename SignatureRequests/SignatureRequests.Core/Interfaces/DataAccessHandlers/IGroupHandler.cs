using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IGroupHandler : IBaseHandler<GroupEntity>
    {
        IEnumerable<GroupEntity> GetAllByFormId(int id);
        IEnumerable<GroupEntity> GetGroupById(int id);
        IEnumerable<GroupEntity> GetAllInclude();
    }
}
