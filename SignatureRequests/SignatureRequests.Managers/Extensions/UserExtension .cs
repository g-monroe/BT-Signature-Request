using BTSuggestions.Core.Entities;
using SignatureRequests.Core.Entities;
using SignatureRequests.Managers.RequestObjects;
using SignatureRequests.Managers.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserRequests.Managers.Extensions
{
    public static class UserExtension
    {
        public static UserResponseList UserToListResponse(this IEnumerable<UserEntity> me)
        {
            var resp = new UserResponseList
            {
                TotalResults = me.Count(),
                UsersList= me.Select(x => x.UserToListItem()).ToList()
            };
            return resp;
        }
        public static UserResponse UserToListItem(this UserEntity me)
        {
            return new UserResponse()
            {
                Id = me.Id,
                Signature = me.Signature,
                SignatureId = me.SignatureId,
                Email = me.Email,
                Name = me.Name,
                Initial = me.Initial,
                InitialId = me.InitialId,
                Password = me.Password,
                Role = me.Role
            };
        }
        public static UserEntity UserToDbItem(this UserRequest me, UserEntity updating = null)
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
