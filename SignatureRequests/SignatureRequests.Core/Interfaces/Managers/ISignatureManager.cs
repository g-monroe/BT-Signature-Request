using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface ISignatureManager
    {
        SignatureResponseList GetSignatures();
        SignatureResponse GetSignature(int id);
        SignatureResponse GetUserSignature(int userId);
        SignatureResponse GetUserInitial(int userId);
        Boolean HasUserSignature(int userId);
        Boolean HasUserInitial(int userId);
        SignatureResponse CreateSignatureEntity(SignatureRequest newSignature);
        Task SaveSignatureAsync(MultipartMemoryStreamProvider provider, string filePath);
        SignatureResponse UpdateSignature(int id, SignatureRequest newSignature);
        void Delete(int id);
        SignatureResponseList GetAllInclude();
    }
}
