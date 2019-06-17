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
        IEnumerable<SignatureEntity> GetSignatures();
        SignatureEntity GetSignature(int id);
        SignatureEntity CreateSignatureEntity(SignatureEntity newSignature);
        SignatureEntity UpdateSignature(SignatureEntity signature, SignatureEntity newSignature);
        void Delete(SignatureEntity signature);
        IEnumerable<SignatureEntity> GetAllInclude();
        SignatureResponseList SignatureToListResponse(IEnumerable<SignatureEntity> me);
        SignatureEntity SignatureToDbItem(SignatureRequest me, SignatureEntity updating = null);
        SignatureResponse SignatureToListItem(SignatureEntity me);
    }
}
