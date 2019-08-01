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
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Enums;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Numerics;
using Org.BouncyCastle.Crypto.Parameters;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.security;

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
                if (File.Exists(signItem.PfxPath))
                {
                    File.Delete(signItem.PfxPath);
                }
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
        private void Sign(String src, String dest, ICollection<X509Certificate> chain, ICipherParameters pk,
                       String digestAlgorithm, CryptoStandard subfilter, String reason, String location, Image image, BoxEntity box)
        {
            // Creating the reader and the stamper
            PdfReader reader = new PdfReader(src);
            FileStream os = new FileStream(dest, FileMode.Create);
            PdfStamper stamper = PdfStamper.CreateSignature(reader, os, '\0');
            
            // Creating the appearance
            PdfSignatureAppearance appearance = stamper.SignatureAppearance;
            appearance.Reason = reason;
            appearance.Location = location;
            var x = (float)box.X;
            var y = (float)(box.FormHeight - (box.Y + box.Height));
            var w = (float)(box.X + box.Width);
            var h = (float)(box.FormHeight - box.Y );
            appearance.SetVisibleSignature(new iTextSharp.text.Rectangle(x, y, w, h), box.PageNumber + 1, box.RequestId.ToString() +":" + h + ":" + y + ":" + box.SignatureId + ":" + box.Id);
            if (box.Type == "Signature")
            {
                appearance.SignatureRenderingMode = PdfSignatureAppearance.RenderingMode.GRAPHIC;
                appearance.SignatureGraphic = image;
            }
            else
            {
                appearance.Layer2Text = box.Text;
                appearance.SignatureRenderingMode = PdfSignatureAppearance.RenderingMode.DESCRIPTION;
            }
            // Creating the signature
            appearance.SignDate = new DateTime();
            IExternalSignature pks = new PrivateKeySignature(pk, digestAlgorithm);
            MakeSignature.SignDetached(appearance, pks, chain, null, null, null, 0, subfilter);
        }

        public void SignDocument(BoxEntity box, SignatureItem signItem, SignatureLibItem signLib, string alias)
        {
            
            var SRC = signItem.LoadPath;
            var DEST = signItem.SavePath + "Temp";
            Pkcs12Store store = signLib.Store;
            ICollection<X509Certificate> chain = new List<X509Certificate>();
            // searching for private key

            foreach (string al in store.Aliases)
                if (store.IsKeyEntry(al) && store.GetKey(al).Key.IsPrivate)
                {
                    alias = al;
                    break;
                }

            AsymmetricKeyEntry pk = store.GetKey(alias);
            foreach (X509CertificateEntry c in store.GetCertificateChain(alias))
                chain.Add(c.Certificate);
            RsaPrivateCrtKeyParameters parameters = pk.Key as RsaPrivateCrtKeyParameters;
                Image image = Image.GetInstance(signItem.SignPath);
                Sign(SRC, String.Format(DEST, 1), chain, parameters, DigestAlgorithms.SHA256,
                    CryptoStandard.CMS, signItem.Reason, signItem.Location, image, box);
            if (File.Exists(SRC))
            {
                File.Delete(SRC);
            }
            File.Move(DEST, DEST.Substring(0, DEST.Length - 4));
        }
    }
}
