
using System.Collections.Generic;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using System.Threading.Tasks;

namespace SignatureRequests.DataAccessHandlers
{
    public class UserHandler : BaseHandler<UserEntity>, IUserHandler
    {
        public UserHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public IEnumerable<UserEntity> GetAllInclude()
        {
            return _context.Users.Include("Signature");
            
        }
        private UserEntity GetUserProperty(int id)
        {
            var user = GetById(id);
            if (user == null)
            {
                return null; 
            }
            return user;
        }
        public string GetEmail(int id)
        {
            var user = GetUserProperty(id);
            return user.Email;
        }

        public string GetRole(int id)
        {
            var user = GetUserProperty(id);
            return user.Role;
        }
        public string GetName(int id)
        {
            var user = GetUserProperty(id);
            return user.Name;
        }

        public SignatureEntity GetSignature(int id)
        {
            var user = GetUserProperty(id);
            return user.Signature;
        }
    }
}