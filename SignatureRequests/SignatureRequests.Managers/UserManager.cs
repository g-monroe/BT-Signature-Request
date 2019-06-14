using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
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
    }
}
