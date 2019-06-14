using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
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
        MemoryStream CreateCertificate(Pkcs12Store _store, SecureRandom _random, SignatureItem _signItem);
        void SignDocument(BoxItem[] boxes, SignatureItem _signItem);
        bool SaveCertificate(Pkcs12Store _store, SecureRandom _random, SignatureItem _signItem);
    }
}
