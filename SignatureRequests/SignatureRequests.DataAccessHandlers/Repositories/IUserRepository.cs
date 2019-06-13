using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;

namespace SignatureRequests.DataAccessHandlers.Repositories
{
    public interface IUserRepository
    {
        IList<UserJSON> GetUsers();
        bool AddUser(UserJSON product);
        bool UpdateUser(UserJSON p);
        bool Delete(int id);
    }
}
