using SignatureRequests.Core.Entities;
using SignatureRequests.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IUserHandler 
    {
        Task<string> GetEmail(int id);
        Task<string> GetRole(int id);
        Task<string> GetName(int id);
    }
}
