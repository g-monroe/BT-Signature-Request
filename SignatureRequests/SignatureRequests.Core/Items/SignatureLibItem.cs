using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Prng;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.X509;
using SignatureRequests.Core.Enums;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using System;
using System.Collections.Generic;
using System.IO;

namespace SignatureRequests.Core
{
    public class SignatureLibItem
    {

        public SecureRandom Random { get; set; }
        public Pkcs12Store Store { get; set; }

        public KeyValuePair<InitializeCertifcation.Error, string> InitializeCertificationStatus { get; set; }
    }
}
