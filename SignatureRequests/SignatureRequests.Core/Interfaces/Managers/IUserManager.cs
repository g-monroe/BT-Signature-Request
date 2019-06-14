using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IUserManager
    {
        IEnumerable<UserEntity> GetUsers();
        Task<UserEntity> GetUser(int id);
        UserEntity CreateUserEntity(UserEntity newUser);
        UserEntity UpdateUser(UserEntity user, UserEntity newUser);
        Task<string> GetName(int id);
        Task<string> GetEmail(int id);
        Task<string> GetRole(int id);
        bool Delete(UserEntity user);
        IEnumerable<UserEntity> GetAllInclude();
    }
}
