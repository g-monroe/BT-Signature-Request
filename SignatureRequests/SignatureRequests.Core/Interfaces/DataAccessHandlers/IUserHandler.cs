using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IUserHandler
    {
        IList<UserJSON> GetUsers();
        bool AddUser(UserJSON product);
        bool UpdateUser(UserJSON p);
        bool Delete(int id);
    }
}
