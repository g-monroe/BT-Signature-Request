using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Prng;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.X509;
using SautinSoft.Document;
using SautinSoft.Document.Drawing;
using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestPDF
{
    public class SignatureManager
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
        private X509Entity _X509Item { get; set; }
        private SignatureItem _SignItem { get; set; }
        private static SecureRandom _Random { get; set; }
        private Pkcs12Store _Store { get; set; }
        public enum _InitializeCertificationStatus
        {
            Initialize = 1,
            Seralize = 2,
            Seed = 3,
            Finialze = 4,
            Success = 5
        }

        public SignatureManager(X509Entity x509Item, SignatureItem signature)
        {
            _X509Item = x509Item;
            _SignItem = signature;
            var result = InitializeCertification();
            if (result.Key != _InitializeCertificationStatus.Success)
            {
                throw new Exception(result.Value);
            }
        }

        public KeyValuePair<_InitializeCertificationStatus, string> InitializeCertification()
        {
            var certificateGenerator = new X509V3CertificateGenerator();
            try
            {
                ////Pt 1: Initialize.
                ///Start Generators
                var randomGenerator = new CryptoApiRandomGenerator();
                var random = new SecureRandom(randomGenerator);
                _Random = random;
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
                BigInteger.One, BigInteger.ValueOf(Int64.MaxValue), _Random);
                certificateGenerator.SetSerialNumber(serialNumber);
                certificateGenerator.SetSignatureAlgorithm(_SignItem.SignatureAlgorithm);
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Seralize, e.Message);
            }
            try
            {
                //Pt 3: Seed Data.
                var subjectDN = new X509Name(_X509Item.Get());
                var issuerDN = subjectDN;
                certificateGenerator.SetIssuerDN(issuerDN);
                certificateGenerator.SetSubjectDN(subjectDN);
                certificateGenerator.SetNotBefore(_SignItem.NotBefore);
                certificateGenerator.SetNotAfter(_SignItem.NotAfter);
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Seed, e.Message);
            }
            try
            {
                //Pt 4: Set Certification
                var keyGenerationParameters = new KeyGenerationParameters(_Random, _SignItem.Strength);
                var keyPairGenerator = new RsaKeyPairGenerator();
                keyPairGenerator.Init(keyGenerationParameters);

                var subjectKeyPair = keyPairGenerator.GenerateKeyPair();
                certificateGenerator.SetPublicKey(subjectKeyPair.Public);
                var issuerKeyPair = subjectKeyPair;
                var certificate = certificateGenerator.Generate(issuerKeyPair.Private, _Random);

                //Pt 5: Create Version for .net usage of cert.
                var store = new Pkcs12Store();
                string friendlyName = certificate.SubjectDN.ToString();
                var certificateEntry = new X509CertificateEntry(certificate);

                store.SetCertificateEntry(friendlyName, certificateEntry);
                store.SetKeyEntry(friendlyName, new AsymmetricKeyEntry(subjectKeyPair.Private), new[] { certificateEntry });
                _Store = store;
            }
            catch (Exception e)
            {
                return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Finialze, e.Message);
            }
            return new KeyValuePair<_InitializeCertificationStatus, string>(_InitializeCertificationStatus.Success, "Success");
        }

        public bool SaveCertificate()
        {
            try
            {
               
                var stream = CreateCertificate();
                _Store.Save(stream, _SignItem.Password.ToCharArray(), _Random);
                File.WriteAllBytes(_SignItem.PfxPath, stream.ToArray());
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return false;
            }
            return true;
        }
        public MemoryStream CreateCertificate()
        {
            try
            {
                //Pt 6: Finish and Save Pfx 
                var stream = new MemoryStream();
                _Store.Save(stream, _SignItem.Password.ToCharArray(), _Random);
                return stream;
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return null;
            }
        }
        public void SignDocument(BoxItem[] boxes)
        {
            //Signature add to document part.
            DocumentCore dc = DocumentCore.Load(_SignItem.LoadPath);
            Shape signatureShape = new Shape(dc, Layout.Floating(new HorizontalPosition(0f, LengthUnit.Millimeter, HorizontalPositionAnchor.LeftMargin),
                            new VerticalPosition(0f, LengthUnit.Millimeter, VerticalPositionAnchor.TopMargin), new Size(1, 1)));
            ((FloatingLayout)signatureShape.Layout).WrappingStyle = WrappingStyle.InFrontOfText;
            signatureShape.Outline.Fill.SetEmpty();

            // Find a first paragraph and insert our Shape inside it.
            Paragraph firstPar = dc.GetChildElements(true).OfType<Paragraph>().FirstOrDefault();
            firstPar.Inlines.Add(signatureShape);
            foreach (BoxItem box in boxes)
            {
                Picture signaturePict = new Picture(dc, _SignItem.SignPath)
                {
                    // Signature picture will be positioned:
                   Layout = Layout.Floating(
                   new HorizontalPosition(box.X, LengthUnit.Centimeter, HorizontalPositionAnchor.Page),// 4.5 cm from Left of the Shape.
                   new VerticalPosition(box.Y, LengthUnit.Centimeter, VerticalPositionAnchor.Page),// 14.5 cm from Top of the Shape.
                   new Size(box.Width, box.Height, LengthUnit.Millimeter)) //Size
                };
                PdfSaveOptions options = new PdfSaveOptions();

                // Path to the certificate (*.pfx).
                options.DigitalSignature.CertificatePath = _SignItem.PfxPath;

                // The password for the certificate.
                // Each certificate is protected by a password.
                // The reason is to prevent unauthorized the using of the certificate.
                options.DigitalSignature.CertificatePassword = _SignItem.Password;

                // Additional information about the certificate.
                options.DigitalSignature.Location = _SignItem.Location;
                options.DigitalSignature.Reason = _SignItem.Reason;
                options.DigitalSignature.ContactInfo = _SignItem.ContactInfo;

                // Placeholder where signature should be visualized.
                options.DigitalSignature.SignatureLine = signatureShape;
                // Visual representation of digital signature.
                options.DigitalSignature.Signature = signaturePict;

                dc.Save(_SignItem.SavePath, options);
            }
        }
    }
}
