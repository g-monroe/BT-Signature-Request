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
        UserEntity GetUser(int id);
        UserEntity CreateUserEntity(UserEntity newUser);
        UserEntity UpdateUser(UserEntity user, UserEntity newUser);
        string GetName(int id);
        string GetEmail(int id);
        string GetRole(int id);
        void Delete(UserEntity user);
        IEnumerable<UserEntity> GetAllInclude();
    }
}
