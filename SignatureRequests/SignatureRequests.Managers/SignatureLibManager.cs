using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using SautinSoft.Document;
using SautinSoft.Document.Drawing;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace SignatureRequests.Managers
{
    public class SignatureLibManager : ISignatureLibManager
    {

        public bool SaveCertificate(Pkcs12Store _store, SecureRandom _random, SignatureItem _signItem)
        {
            try
            {
                var stream = CreateCertificate(_store, _random, _signItem);
                _store.Save(stream, _signItem.Password.ToCharArray(), _random);
                File.WriteAllBytes(_signItem.PfxPath, stream.ToArray());
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return false;
            }
            return true;
        }
        public MemoryStream CreateCertificate(Pkcs12Store _store, SecureRandom _random, SignatureItem _signItem)
        {
            try
            {
                //Pt 6: Finish and Save Pfx 
                var stream = new MemoryStream();
                _store.Save(stream, _signItem.Password.ToCharArray(), _random);
                return stream;
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                return null;
            }
        }
        public void SignDocument(BoxItem[] boxes, SignatureItem _signItem)
        {
            //Signature add to document part.
            DocumentCore dc = DocumentCore.Load(_signItem.LoadPath);
            Shape signatureShape = new Shape(dc, Layout.Floating(new HorizontalPosition(0f, LengthUnit.Millimeter, HorizontalPositionAnchor.LeftMargin),
                            new VerticalPosition(0f, LengthUnit.Millimeter, VerticalPositionAnchor.TopMargin), new Size(1, 1)));
            ((FloatingLayout)signatureShape.Layout).WrappingStyle = WrappingStyle.InFrontOfText;
            signatureShape.Outline.Fill.SetEmpty();

            // Find a first paragraph and insert our Shape inside it.
            Paragraph firstPar = dc.GetChildElements(true).OfType<Paragraph>().FirstOrDefault();
            firstPar.Inlines.Add(signatureShape);
            foreach (BoxItem box in boxes)
            {
                Picture signaturePict = new Picture(dc, _signItem.SignPath)
                {
                    // Signature picture will be positioned:
                    Layout = Layout.Floating(
                   new HorizontalPosition(box.X, LengthUnit.Centimeter, HorizontalPositionAnchor.Page),// 4.5 cm from Left of the Shape.
                   new VerticalPosition(box.Y, LengthUnit.Centimeter, VerticalPositionAnchor.Page),// 14.5 cm from Top of the Shape.
                   new Size(box.Width, box.Height, LengthUnit.Millimeter)) //Size
                };
                PdfSaveOptions options = new PdfSaveOptions();

                // Path to the certificate (*.pfx).
                options.DigitalSignature.CertificatePath = _signItem.PfxPath;

                // The password for the certificate.
                // Each certificate is protected by a password.
                // The reason is to prevent unauthorized the using of the certificate.
                options.DigitalSignature.CertificatePassword = _signItem.Password;

                // Additional information about the certificate.
                options.DigitalSignature.Location = _signItem.Location;
                options.DigitalSignature.Reason = _signItem.Reason;
                options.DigitalSignature.ContactInfo = _signItem.ContactInfo;

                // Placeholder where signature should be visualized.
                options.DigitalSignature.SignatureLine = signatureShape;
                // Visual representation of digital signature.
                options.DigitalSignature.Signature = signaturePict;

                dc.Save(_signItem.SavePath, options);
            }
        }
    }
}
