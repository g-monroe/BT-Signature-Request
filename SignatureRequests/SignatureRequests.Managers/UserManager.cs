using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
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
        private readonly IUserEngine _userEngine;
        private readonly ISignatureEngine _signatureEngine;
        public UserManager(IUserHandler userHandler, ISignatureEngine signatureEngine, IUserEngine userEngine)
        {
            _userHandler = userHandler;
            _signatureEngine = signatureEngine;
            _userEngine = userEngine;
        }
        public UserResponse CreateUserEntity(UserRequest newUser)
        {
            var user = _userEngine.UserToDbItem(newUser);
            _userHandler.Insert(user);
            _userHandler.SaveChanges();
            var result = _userEngine.UserToListItem(user);
            return result;
        }

        public void Delete(int id)
        {
            var user = _userHandler.GetById(id);
            _userHandler.Delete(user);
            _userHandler.SaveChanges();
        }

        public string GetEmail(int id)
        {
            UserResponse result = GetUser(id);
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
            var resp = _userEngine.UserToListItem(result);
            return resp;
        }

        public SimpleUserResponse GetSimpleUser(int id)
        {
            SimpleUserResponse user;

            try
            {
                user = EntityToSimple(_userHandler.GetById(id));
            }
            catch
            {
                user = new SimpleUserResponse();
            }
      
            return user;
        }

        public NumberResponse GetUserSigId(int UserId)
        {
            int id;
            try
            {  
                id = _userHandler.GetById(UserId).SignatureId.GetValueOrDefault(-1);
            }
            catch (Exception e)
            {
                throw e;
                id = -1;
            }

            return new NumberResponse()
            {
                Num = id
            };
        }

        public NumberResponse GetUserInitialId(int UserId)
        {
            int id;
            try
            {
                id = _userHandler.GetById(UserId).InitialId.GetValueOrDefault(-1);
            }
            catch(Exception e)
            {
                throw e;
                id = -1;
            }

            return new NumberResponse()
            {
                Num = id
            };
        }

        public UserResponseList GetUsers()
        {
            var result = _userHandler.GetAllInclude();
            var resp = _userEngine.UserToListResponse(result);
            return resp;
        }
        public UserResponseList GetAllInclude()
        {
            var result = _userHandler.GetAllInclude();
            var resp = _userEngine.UserToListResponse(result);
            return resp;
        }
        public UserResponse UpdateUser(int id, UserRequest newUser)
        {
            var user = _userHandler.GetById(id);
            var reqUser = _userEngine.UserToDbItem(newUser);
            user.Signature = reqUser.Signature;
            user.SignatureId = reqUser.SignatureId;
            user.Email = reqUser.Email;
            user.Name = reqUser.Name;
            user.Initial = reqUser.Initial;
            user.InitialId = reqUser.InitialId;
            user.Password = reqUser.Password;
            user.Role = reqUser.Role;
            _userHandler.Update(user);
            _userHandler.SaveChanges();
            var result = _userEngine.UserToListItem(user);
            return result;
        }

        public UserResponse Verify(UserVerificationRequest info)
        {
            var user = _userHandler.GetByName(info.name);

            if(user != null && user.Password == info.password)
            {
                return _userEngine.UserToListItem(user);
            }
            else
            {
                return null;
            }
        }

        public SimpleUserResponse EntityToSimple(UserEntity user)
        {
            var _user = new SimpleUserResponse()
            {
                Id = user.Id,
                Role = user.Role,
                Name = user.Name,
                Email = user.Email,
                SignatureId = user.SignatureId,
                InitialId = user.InitialId
            };
            

            return _user;
        }

       
    }
}
