using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Items;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface ISignatureLibManager
    {
        
        SignatureLibItem InitializeCertification(SignatureItem signItem, X509Item x509Item);
        MemoryStream CreateCertificate(SignatureLibItem result, SignatureItem signItem);
        void SignDocument(BoxEntity[] boxes, SignatureItem signItem);
        bool SaveCertificate(SignatureLibItem resultm, SignatureItem signItem);
    }
}
