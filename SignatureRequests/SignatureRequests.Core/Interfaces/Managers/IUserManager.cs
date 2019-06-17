using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
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
        UserResponseList UserToListResponse(IEnumerable<UserEntity> me);
        UserEntity UserToDbItem(UserRequest me, UserEntity updating = null);
        UserResponse UserToListItem(UserEntity me);
    }
}
