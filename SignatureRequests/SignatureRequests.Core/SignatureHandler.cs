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
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestPDF
{
    public class SignatureHandler
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
        public X509Entity X509Item { get; set; }
        public string Password { get; set; }
        public string SignatureAlgorithm { get; set; }
        public int Strength { get; set; }
        public string LoadPath { get; set; }
        public string SavePath { get; set; }
        public string SignPath { get; set; }
        public string PfxPath { get; set; }
        public DateTime NotBefore { get; set; }
        public DateTime NotAfter { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string ContactInfo { get; set; }
        #pragma warning disable IDE1006 // Naming Styles
        private static SecureRandom _Random { get; set; }
        #pragma warning disable IDE1006 // Naming Styles
        private Pkcs12Store _Store { get; set; }


        public SignatureHandler(X509Entity x509Item, string password, string signatureAlgorithm = "SHA256WithRSA", int strength = 2048, string loadPath = "", string savePath = "", string signPath = "", string pfxPath = "", DateTime notBefore = new DateTime(), DateTime notAfter = new DateTime(), string location = "", string reason = "", string contactInfo = "")
        {
            X509Item = x509Item;
            SignatureAlgorithm = signatureAlgorithm;
            Password = password;
            Strength = strength;
            LoadPath = loadPath;
            SavePath = savePath;
            SignPath = signPath;
            PfxPath = pfxPath;
            NotBefore = notBefore;
            NotAfter = notAfter;
            Location = location;
            Reason = reason;
            ContactInfo = contactInfo;
            if (!InitCert())
            {
                throw new Exception("Couldn't Initialize Signature Handler!");
            }
        }

        public bool InitCert()
        {
            try
            {
                ////Pt 1: Initialize.
                ///Start Generators
                var randomGenerator = new CryptoApiRandomGenerator();
                var random = new SecureRandom(randomGenerator);
                var certificateGenerator = new X509V3CertificateGenerator();
                _Random = random;

                ////Pt 2: Seralize.
                ///Select Encryption level, and create serialNumber
                var serialNumber = BigIntegers.CreateRandomInRange(
                BigInteger.One, BigInteger.ValueOf(Int64.MaxValue), random);
                certificateGenerator.SetSerialNumber(serialNumber);
                certificateGenerator.SetSignatureAlgorithm(SignatureAlgorithm);

                  
                //Pt 3: Seed Data.
                var subjectDN = new X509Name(X509Item.Get());
                var issuerDN = subjectDN;
                certificateGenerator.SetIssuerDN(issuerDN);
                certificateGenerator.SetSubjectDN(subjectDN);
                certificateGenerator.SetNotBefore(NotBefore);
                certificateGenerator.SetNotAfter(NotAfter);

                //Pt 4: Set Certification
                var keyGenerationParameters = new KeyGenerationParameters(random, Strength);
                var keyPairGenerator = new RsaKeyPairGenerator();
                keyPairGenerator.Init(keyGenerationParameters);
                var subjectKeyPair = keyPairGenerator.GenerateKeyPair();
                certificateGenerator.SetPublicKey(subjectKeyPair.Public);
                var issuerKeyPair = subjectKeyPair;
                var certificate = certificateGenerator.Generate(issuerKeyPair.Private, random);
                //Pt 5: Create Version for .net usage of cert.
                var store = new Pkcs12Store();
                string friendlyName = certificate.SubjectDN.ToString();
                var certificateEntry = new X509CertificateEntry(certificate);
                store.SetCertificateEntry(friendlyName, certificateEntry);
                store.SetKeyEntry(friendlyName, new AsymmetricKeyEntry(subjectKeyPair.Private), new[] { certificateEntry });
                _Store = store;
            }
            catch(Exception e)
            {
                Debug.Write(e.Message);
                return false;
            }
            return true;
        }
        public bool SaveCertificate()
        {
            try
            {
               
                var stream = CreateCertificate();
                _Store.Save(stream, Password.ToCharArray(), _Random);
                File.WriteAllBytes(PfxPath, stream.ToArray());
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
                _Store.Save(stream, Password.ToCharArray(), _Random);
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
            DocumentCore dc = DocumentCore.Load(LoadPath);
            Shape signatureShape = new Shape(dc, Layout.Floating(new HorizontalPosition(0f, LengthUnit.Millimeter, HorizontalPositionAnchor.LeftMargin),
                            new VerticalPosition(0f, LengthUnit.Millimeter, VerticalPositionAnchor.TopMargin), new Size(1, 1)));
            ((FloatingLayout)signatureShape.Layout).WrappingStyle = WrappingStyle.InFrontOfText;
            signatureShape.Outline.Fill.SetEmpty();

            // Find a first paragraph and insert our Shape inside it.
            Paragraph firstPar = dc.GetChildElements(true).OfType<Paragraph>().FirstOrDefault();
            firstPar.Inlines.Add(signatureShape);
            foreach (BoxItem box in boxes)
            {
                Picture signaturePict = new Picture(dc, SignPath)
                {
                    // Signature picture will be positioned:
                   Layout = Layout.Floating(
                   new HorizontalPosition(box.X, LengthUnit.Centimeter, HorizontalPositionAnchor.Page),// 4.5 cm from Left of the Shape.
                   new VerticalPosition(box.Y, LengthUnit.Centimeter, VerticalPositionAnchor.Page),// 14.5 cm from Top of the Shape.
                   new Size(box.Width, box.Height, LengthUnit.Millimeter)) //Size
                };
                PdfSaveOptions options = new PdfSaveOptions();

                // Path to the certificate (*.pfx).
                options.DigitalSignature.CertificatePath = PfxPath;

                // The password for the certificate.
                // Each certificate is protected by a password.
                // The reason is to prevent unauthorized the using of the certificate.
                options.DigitalSignature.CertificatePassword = Password;

                // Additional information about the certificate.
                options.DigitalSignature.Location = Location;
                options.DigitalSignature.Reason = Reason;
                options.DigitalSignature.ContactInfo = ContactInfo;

                // Placeholder where signature should be visualized.
                options.DigitalSignature.SignatureLine = signatureShape;
                // Visual representation of digital signature.
                options.DigitalSignature.Signature = signaturePict;

                dc.Save(SavePath, options);
            }
        }
    }
}
