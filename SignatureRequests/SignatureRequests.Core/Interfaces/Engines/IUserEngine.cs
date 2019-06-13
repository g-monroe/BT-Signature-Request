using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Engines
{
    public interface IUserEngine
    {
        Task<IEnumerable<UserEntity>> GetUsers();
        Task<UserEntity> GetUser(int id);
        Task<UserEntity> CreateUserEntity(UserEntity newUser);
        Task<UserEntity> UpdateUser(UserEntity user, UserEntity newUser);
        Task<int> GetPrivilege(int id);
        Task<string> GetName(int id);
        Task<string> GetEmail(int id);
        Task<string> GetRole(int id);
        Task Delete(UserEntity user);
    }
}
