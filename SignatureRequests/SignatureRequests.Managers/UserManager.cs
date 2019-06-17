using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class UserManager : IUserManager
    {
        private readonly IUserHandler _userHandler;
        public UserManager(IUserHandler userHandler)
        {
            _userHandler = userHandler;
        }
        public UserResponse CreateUserEntity(UserRequest newUser)
        {
            var user = UserToDbItem(newUser);
            _userHandler.Insert(user);
            _userHandler.SaveChanges();
            var result = UserToListItem(user);
            return result;
        }

        public void Delete(int id)
        {
            var user = _userHandler.GetById(id);
            _userHandler.Delete(user);
        }

        public string GetEmail(int id)
        {
            UserResponse result =  GetUser(id);
            if (result == null)
            {
                return "";
            }
            return result.Email;
        }

        public string GetName(int id)
        {
            UserResponse result = GetUser(id);
            return result.Name;
        }

        public string GetRole(int id)
        {
            UserResponse result = GetUser(id);
            return result.Role;
        }

        public UserResponse GetUser(int id)
        {
            var result = _userHandler.GetById(id);
            var resp = UserToListItem(result);
            return resp;
        }

        public UserResponseList GetUsers()
        {
            var result = _userHandler.GetAll();
            var resp = UserToListResponse(result);
            return resp;
        }
        public UserResponseList GetAllInclude()
        {
            var result =  _userHandler.GetAllInclude();
            var resp = UserToListResponse(result);
            return resp;
        }
        public UserResponse UpdateUser(int id, UserRequest newUser)
        {
            var user = _userHandler.GetById(id);
            var reqUser = UserToDbItem(newUser);
            user.Signature = reqUser.Signature;
            user.SignatureId = reqUser.SignatureId;
            user.Email = reqUser.Email;
            user.Name = reqUser.Name;
            user.Initial = reqUser.Initial;
            user.InitialId = reqUser.InitialId;
            user.Password = reqUser.Password;
            user.Role = reqUser.Role;
            _userHandler.Update(user);
            var result = UserToListItem(user);
            return result;
        }
        public UserResponseList UserToListResponse(IEnumerable<UserEntity> me)
        {
            var resp = new UserResponseList
            {
                TotalResults = me.Count(),
                UsersList = new List<UserResponse>()
            };
            
            foreach(UserEntity user in me)
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
