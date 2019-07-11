using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Engines
{
    public interface IUserEngine
    {
        UserResponseList UserToListResponse(IEnumerable<UserEntity> me);
        UserResponse UserToListItem(UserEntity me);
        UserEntity UserToDbItem(UserRequest me, UserEntity updating = null);
    }
}
