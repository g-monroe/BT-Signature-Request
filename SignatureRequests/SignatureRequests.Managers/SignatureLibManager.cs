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
using SignatureRequests.Core;
using SignatureRequests.Core.Enums;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Numerics;

namespace SignatureRequests.Managers
{
    public class SignatureLibManager : ISignatureLibManager
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


        public SignatureLibItem InitializeCertification(SignatureItem signItem, X509Item x509Item)
        {
            var certificateGenerator = new X509V3CertificateGenerator();
            SignatureLibItem result = new SignatureLibItem();
            try
            {
                ////Pt 1: Initialize.
                ///Start Generators
                var randomGenerator = new CryptoApiRandomGenerator();
                var random = new SecureRandom(randomGenerator);
                result.Random = random;
            }
            catch (Exception e)
            {
                result.InitializeCertificationStatus =  new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Initialize, e.Message);
                return result;
            }
            try
            {
                ////Pt 2: Seralize.
                ///Select Encryption level, and create serialNumber
                var serialNumber = BigIntegers.CreateRandomInRange(
                Org.BouncyCastle.Math.BigInteger.One, Org.BouncyCastle.Math.BigInteger.ValueOf(Int64.MaxValue), result.Random);
                certificateGenerator.SetSerialNumber(serialNumber);
                certificateGenerator.SetSignatureAlgorithm(signItem.SignatureAlgorithm);
            }
            catch (Exception e)
            {
                result.InitializeCertificationStatus = new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Seralize, e.Message);
                return result;
            }
            try
            {
                //Pt 3: Seed Data.
                var subjectDN = new X509Name(x509Item.Get());
                var issuerDN = subjectDN;
                certificateGenerator.SetIssuerDN(issuerDN);
                certificateGenerator.SetSubjectDN(subjectDN);
                certificateGenerator.SetNotBefore(signItem.NotBefore);
                certificateGenerator.SetNotAfter(signItem.NotAfter);
            }
            catch (Exception e)
            {
                result.InitializeCertificationStatus = new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Seed, e.Message);
                return result;
            }
            try
            {
                //Pt 4: Set Certification
                var keyGenerationParameters = new KeyGenerationParameters(result.Random, signItem.Strength);
                var keyPairGenerator = new RsaKeyPairGenerator();
                keyPairGenerator.Init(keyGenerationParameters);

                var subjectKeyPair = keyPairGenerator.GenerateKeyPair();
                certificateGenerator.SetPublicKey(subjectKeyPair.Public);
                var issuerKeyPair = subjectKeyPair;
                var certificate = certificateGenerator.Generate(issuerKeyPair.Private, result.Random);

                //Pt 5: Create Version for .net usage of cert.
                var store = new Pkcs12Store();
                string friendlyName = certificate.SubjectDN.ToString();
                var certificateEntry = new X509CertificateEntry(certificate);

                store.SetCertificateEntry(friendlyName, certificateEntry);
                store.SetKeyEntry(friendlyName, new AsymmetricKeyEntry(subjectKeyPair.Private), new[] { certificateEntry });
                result.Store = store;

            }
            catch (Exception e)
            {
                result.InitializeCertificationStatus = new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Finialze, e.Message);
                return result;
            }
            result.InitializeCertificationStatus = new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Success, "Success");
            return result;
        }
        public bool SaveCertificate(SignatureLibItem result, SignatureItem signItem)
        {
            try
            {
                var stream = CreateCertificate(result, signItem);
                result.Store.Save(stream, signItem.Password.ToCharArray(), result.Random);
                File.WriteAllBytes(signItem.PfxPath, stream.ToArray());
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return false;
            }
            return true;
        }
        public MemoryStream CreateCertificate(SignatureLibItem result, SignatureItem signItem)
        {
            try
            {
                //Pt 6: Finish and Save Pfx 
                var stream = new MemoryStream();
               result.Store.Save(stream, signItem.Password.ToCharArray(), result.Random);
                return stream;
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return null;
            }
        }
        public void SignDocument(BoxItem[] boxes, SignatureItem signItem)
        {
            //Signature add to document part.
            DocumentCore dc = DocumentCore.Load(signItem.LoadPath);
            Shape signatureShape = new Shape(dc, Layout.Floating(new HorizontalPosition(0f, LengthUnit.Millimeter, HorizontalPositionAnchor.LeftMargin),
                            new VerticalPosition(0f, LengthUnit.Millimeter, VerticalPositionAnchor.TopMargin), new Size(1, 1)));
            ((FloatingLayout)signatureShape.Layout).WrappingStyle = WrappingStyle.InFrontOfText;
            signatureShape.Outline.Fill.SetEmpty();

            // Find a first paragraph and insert our Shape inside it.
            Paragraph firstPar = dc.GetChildElements(true).OfType<Paragraph>().FirstOrDefault();
            firstPar.Inlines.Add(signatureShape);
            foreach (BoxItem box in boxes)
            {
                Picture signaturePict = new Picture(dc, signItem.SignPath)
                {
                    // Signature picture will be positioned:
                    Layout = Layout.Floating(
                   new HorizontalPosition(box.X, LengthUnit.Centimeter, HorizontalPositionAnchor.Page),// 4.5 cm from Left of the Shape.
                   new VerticalPosition(box.Y, LengthUnit.Centimeter, VerticalPositionAnchor.Page),// 14.5 cm from Top of the Shape.
                   new Size(box.Width, box.Height, LengthUnit.Millimeter)) //Size
                };
                PdfSaveOptions options = new PdfSaveOptions();

                // Path to the certificate (*.pfx).
                options.DigitalSignature.CertificatePath = signItem.PfxPath;

                // The password for the certificate.
                // Each certificate is protected by a password.
                // The reason is to prevent unauthorized the using of the certificate.
                options.DigitalSignature.CertificatePassword = signItem.Password;

                // Additional information about the certificate.
                options.DigitalSignature.Location = signItem.Location;
                options.DigitalSignature.Reason = signItem.Reason;
                options.DigitalSignature.ContactInfo = signItem.ContactInfo;

                // Placeholder where signature should be visualized.
                options.DigitalSignature.SignatureLine = signatureShape;
                // Visual representation of digital signature.
                options.DigitalSignature.Signature = signaturePict;

                dc.Save(signItem.SavePath, options);
            }
        }
    }
}
