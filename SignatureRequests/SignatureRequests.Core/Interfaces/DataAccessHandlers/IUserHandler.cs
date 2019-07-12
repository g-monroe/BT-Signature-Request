using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IUserHandler : IBaseHandler<UserEntity>
    {
        string GetEmail(int id);
        string GetRole(int id);
        string GetName(int id);
        SignatureEntity GetInitial(int userId);
        SignatureEntity GetSignature(int userId);
        IEnumerable<UserEntity> GetAllInclude();
        UserEntity GetByName(string name);
    }
}
