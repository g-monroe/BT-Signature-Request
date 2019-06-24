using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IFormHandler : IBaseHandler<FormEntity>
    {
        IEnumerable<FormEntity> GetAllById(int id);
        IEnumerable<FormEntity> GetAllByUserId(int id);
        IEnumerable<FormEntity> GetAllInclude();
    }
}
