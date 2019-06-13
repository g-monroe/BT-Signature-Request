using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;

namespace SignatureRequests.Repositories
{
    public interface IUserRepository
    {
        IList<UserEntity> GetUsers();
        bool AddUser(UserEntity product);
        bool UpdateUser(UserEntity p);
        bool Delete(int id);
    }
}
