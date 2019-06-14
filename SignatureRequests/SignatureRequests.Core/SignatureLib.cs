using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Prng;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.X509;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using System;
using System.Collections.Generic;
using System.IO;

namespace SignatureRequests.Core
{
    public class SignatureLib
    {
        /// <summary>
        /// This handler is to handle the certification making and signature control.
        /// Overall does all the work for processing the document and adding the signature.
        /// This handler shouldn't be in communication directly with the database other than
        /// called for work on the document itself. Below are examples.
        /// -> cont. Examples
        /// var x509Item = new TestPDF.X509Entity(TestPDF.X509Entity.Country.US,
        ///   TestPDF.X509Entity.Country.US, TestPDF.X509Entity.Country.US,
        ///   "GavinMonroe", DateTime.Now, "gavin@gmail.com", "M", "GM", "IA", "123123", "Test", "builderTrend");
        /// const string password = "password";
        /// const string signatureAlgorithm = "SHA256WithRSA";
        /// const int strength = 2048;
        /// string loadPath = @"..\..\..\digitalsignature.pdf";
        /// string savePath = @"..\..\..\result.pdf";
        /// string signPath = @"..\..\..\signature.png";
        /// string pfxPath = @"..\..\..\result.pfx";
        /// DateTime notBefore = DateTime.UtcNow.Date;
        /// DateTime notAfter = notBefore.AddYears(2);
        /// string location = "Location";
        /// string reason = "reason";
        /// string contactInfo = "ContactInfo";
        /// </summary>
#pragma warning disable IDE1006 // Naming Styles
        private X509Item _x509Item { get; set; }
        private SignatureItem _signItem { get; set; }
        private SecureRandom _random { get; set; }
        private Pkcs12Store _store { get; set; }
        private ISignatureLibManager _manager { get; set; }
        public enum _InitializeCertificationStatus
        {
            Initialize = 1,
            Seralize = 2,
            Seed = 3,
            Finialze = 4,
            Success = 5
        }

        public SignatureLib(X509Item x509Item, SignatureItem signature, ISignatureLibManager lib)
        {
            _x509Item = x509Item;
            _signItem = signature;
            _manager = lib;
            var result = InitializeCertification(lib);
            if (result.Key != _InitializeCertificationStatus.Success)
            {
                throw new Exception(result.Value);
            }
        }

        public KeyValuePair<_InitializeCertificationStatus, string> InitializeCertification(ISignatureLibManager lib)
        {
            var certificateGenerator = new X509V3CertificateGenerator();
            try
            {
                ////Pt 1: Initialize.
                ///Start Generators
                var randomGenerator = new CryptoApiRandomGenerator();
                var random = new SecureRandom(randomGenerator);
                _random = random;
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Initialize, e.Message);
            }
            try
            {
                ////Pt 2: Seralize.
                ///Select Encryption level, and create serialNumber
                var serialNumber = BigIntegers.CreateRandomInRange(
                BigInteger.One, BigInteger.ValueOf(Int64.MaxValue), _random);
                certificateGenerator.SetSerialNumber(serialNumber);
                certificateGenerator.SetSignatureAlgorithm(_signItem.SignatureAlgorithm);
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Seralize, e.Message);
            }
            try
            {
                //Pt 3: Seed Data.
                var subjectDN = new X509Name(_x509Item.Get());
                var issuerDN = subjectDN;
                certificateGenerator.SetIssuerDN(issuerDN);
                certificateGenerator.SetSubjectDN(subjectDN);
                certificateGenerator.SetNotBefore(_signItem.NotBefore);
                certificateGenerator.SetNotAfter(_signItem.NotAfter);
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Seed, e.Message);
            }
            try
            {
                //Pt 4: Set Certification
                var keyGenerationParameters = new KeyGenerationParameters(_random, _signItem.Strength);
                var keyPairGenerator = new RsaKeyPairGenerator();
                keyPairGenerator.Init(keyGenerationParameters);

                var subjectKeyPair = keyPairGenerator.GenerateKeyPair();
                certificateGenerator.SetPublicKey(subjectKeyPair.Public);
                var issuerKeyPair = subjectKeyPair;
                var certificate = certificateGenerator.Generate(issuerKeyPair.Private, _random);

                //Pt 5: Create Version for .net usage of cert.
                var store = new Pkcs12Store();
                string friendlyName = certificate.SubjectDN.ToString();
                var certificateEntry = new X509CertificateEntry(certificate);

                store.SetCertificateEntry(friendlyName, certificateEntry);
                store.SetKeyEntry(friendlyName, new AsymmetricKeyEntry(subjectKeyPair.Private), new[] { certificateEntry });
                _store = store;
                
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Finialze, e.Message);
            }
            return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Success, "Success");
        }
        public MemoryStream CreateCertificate(SecureRandom random, SignatureItem signItem)
        {
            return _manager.CreateCertificate(_store, random, signItem);
        }
        public void SignDocument(BoxItem[] boxes, SignatureItem signItem)
        {
            _manager.SignDocument(boxes, signItem);
        }
        public bool SaveCertificate(SecureRandom random, SignatureItem signItem)
        {
            return _manager.SaveCertificate(_store, random, signItem);
        }
    }
}
