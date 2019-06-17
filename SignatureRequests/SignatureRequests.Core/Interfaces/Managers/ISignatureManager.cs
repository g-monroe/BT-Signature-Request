using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface ISignatureManager
    {
        SignatureResponseList GetSignatures();
        SignatureResponse GetSignature(int id);
        SignatureResponse CreateSignatureEntity(SignatureRequest newSignature);
        SignatureResponse UpdateSignature(int id, SignatureRequest newSignature);
        void Delete(int id);
        SignatureResponseList GetAllInclude();
        SignatureResponseList SignatureToListResponse(IEnumerable<SignatureEntity> me);
        SignatureEntity SignatureToDbItem(SignatureRequest me, SignatureEntity updating = null);
        SignatureResponse SignatureToListItem(SignatureEntity me);
    }
}
