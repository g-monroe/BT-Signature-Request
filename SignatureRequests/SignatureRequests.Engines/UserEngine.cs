using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Engines
{
    public class UserEngine : IUserEngine
    {
        private readonly ISignatureEngine _signatureEngine;
        public UserEngine(ISignatureEngine signatureEngine)
        {
            _signatureEngine = signatureEngine;
        }

        public UserResponseList UserToListResponse(IEnumerable<UserEntity> me)
        {
            var resp = new UserResponseList
            {
                TotalResults = me.Count(),
                UsersList = new List<UserResponse>()
            };

            foreach (UserEntity user in me)
            {
                resp.UsersList.Add(UserToListItem(user));
            }
            return resp;
        }
        public UserResponse UserToListItem(UserEntity me)
        {
            return new UserResponse()
            {
                Id = me.Id,
                Signature = _signatureEngine.SignatureToListItem(me.Signature),
                SignatureId = me.SignatureId,
                Email = me.Email,
                Name = me.Name,
                Initial = _signatureEngine.SignatureToListItem(me.Initial),
                InitialId = me.InitialId,
                Password = me.Password,
                Role = me.Role
            };
        }
        public UserEntity UserToDbItem(UserRequest me, UserEntity updating = null)
        {
            if (updating == null)
            {
                updating = new UserEntity();
            }
            updating.Id = me.Id;
            updating.Signature = me.Signature;
            updating.SignatureId = me.SignatureId;
            updating.Email = me.Email;
            updating.Name = me.Name;
            updating.Initial = me.Initial;
            updating.InitialId = me.InitialId;
            updating.Password = me.Password;
            updating.Role = me.Role;
            return updating;
        }
    }
}
