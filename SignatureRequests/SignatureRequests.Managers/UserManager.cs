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
        public UserEntity CreateUserEntity(UserEntity newUser)
        {
            _userHandler.Insert(newUser);
            _userHandler.SaveChanges();
            return newUser;
        }

        public void Delete(UserEntity user)
        {
            _userHandler.Delete(user);
        }

        public string GetEmail(int id)
        {
            UserEntity result =  GetUser(id);
            if (result == null)
            {
                return "";
            }
            return result.Email;
        }

        public string GetName(int id)
        {
            UserEntity result = GetUser(id);
            return result.Name;
        }

        public string GetRole(int id)
        {
            UserEntity result = GetUser(id);
            return result.Role;
        }

        public UserEntity GetUser(int id)
        {
            var result = _userHandler.GetById(id);
            return result;
        }

        public IEnumerable<UserEntity> GetUsers()
        {
            return _userHandler.GetAll();
        }
        public IEnumerable<UserEntity> GetAllInclude()
        {
            return _userHandler.GetAllInclude();
        }
        public UserEntity UpdateUser(UserEntity user, UserEntity newUser)
        {
            user.Signature = newUser.Signature;
            user.SignatureId = newUser.SignatureId;
            user.Email = newUser.Email;
            user.Name = newUser.Name;
            user.Initial = newUser.Initial;
            user.InitialId = newUser.InitialId;
            user.Password = newUser.Password;
            user.Role = newUser.Role;
            _userHandler.Update(user);
            return user;
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
