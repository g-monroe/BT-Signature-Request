
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
        public async Task<string> GetEmail(int id)
        {
            var user = await GetById(id);
            if (user == null)
            {
                return null;
            }

            return user.Email;
        }

        public async Task<string> GetRole(int id)
        {
            var user = await GetById(id);
            if (user == null)
            {
                return "";
            }
            return user.Role;
        }
        public async Task<string> GetName(int id)
        {
            var user = await GetById(id);
            if (user == null)
            {
                return null;
            }
            return user.Name;
        }
    }
}