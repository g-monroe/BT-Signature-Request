using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Engines
{
    public interface ISignatureEngine
    {
        SignatureResponseList SignatureToListResponse(IEnumerable<SignatureEntity> me);
        SignatureResponse SignatureToListItem(SignatureEntity me);
        SignatureEntity SignatureToDbItem(SignatureRequest me, SignatureEntity updating = null);
    }
}
