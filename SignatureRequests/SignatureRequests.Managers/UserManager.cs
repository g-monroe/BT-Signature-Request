using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.Engines;
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
        private readonly IUserEngine _userEngine;
        public UserManager(IUserEngine userEngine)
        {
            _userEngine = userEngine;
        }

        public UserEntity CreateUserEntity(UserEntity newUser)
        {
            return _userEngine.CreateUserEntity(newUser);
        }

        public bool Delete(UserEntity user)
        {
            return _userEngine.Delete(user);
        }

        public async Task<string> GetEmail(int id)
        {
            return await _userEngine.GetEmail(id);
        }

        public async Task<string> GetName(int id)
        {
            return await _userEngine.GetName(id);
        }

        public async Task<string> GetRole(int id)
        {
            return await _userEngine.GetRole(id);
        }

        public async Task<UserEntity> GetUser(int id)
        {
            return await _userEngine.GetUser(id);
        }

        public IEnumerable<UserEntity> GetUsers()
        {
            return _userEngine.GetUsers();
        }
        public IEnumerable<UserEntity> GetAllInclude()
        {
            return _userEngine.GetAllInclude();
        }
        public UserEntity UpdateUser(UserEntity user, UserEntity newUser)
        {
            return _userEngine.UpdateUser(user, newUser);
        }
    }
}
