using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Engines
{
    public interface IGroupEngine
    {
        GroupResponse GroupToListItem(GroupEntity group);
        FormResponse FormToListItem(FormEntity form);
        RequestResponse RequestToListItem(RequestEntity request);
        RequestEntity RequestToEntity(RequestRequest request, RequestEntity updating = null);
        FormEntity FormToEntity(FormRequest form, FormEntity updating = null);
    }
}
