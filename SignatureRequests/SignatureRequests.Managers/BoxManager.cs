using iTextSharp.text.pdf;
using iTextSharp.text.pdf.security;
using SautinSoft.Document;
using SignatureRequests.Core;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Enums;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.Items;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Prng;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.X509;
using Org.BouncyCastle.Crypto.Parameters;
using iTextSharp.text;

namespace SignatureRequests.Managers
{
    public class BoxManager : IBoxManager
    {
        private readonly IBoxHandler _boxHandler;
        private readonly IRequestHandler _requestHandler;
        private readonly ISignatureHandler _signatureHandler;
        private readonly IFormHandler _formHandler;
        private readonly IUserHandler _userHandler;
        private readonly ISignatureEngine _signatureEngine;
        public BoxManager(IBoxHandler boxHandler, IRequestHandler requestHandler, ISignatureHandler signatureHandler, IFormHandler formHandler, IGroupEngine groupEngine, ISignatureEngine signatureEngine, IUserHandler userHandler)
        {
            _boxHandler = boxHandler;
            _requestHandler = requestHandler;
            _signatureHandler = signatureHandler;
            _formHandler = formHandler;
            _userHandler = userHandler;
            _signatureEngine = signatureEngine;
        }
        public BoxResponse CreateBoxEntity(BoxRequest newBox)
        {
            var result = BoxToDbItem(newBox);
            _boxHandler.Insert(result);
            _boxHandler.SaveChanges();
            var resp = BoxToListItem(result);
            return resp;
        }

        public void Delete(int id)
        {
            var signature = _boxHandler.GetById(id);
            _boxHandler.Delete(signature);
            _boxHandler.SaveChanges();
        }

        public void DeleteModelBoxes(int id)
        {
            IEnumerable<BoxEntity> boxes = _boxHandler.GetModelBoxesByFormId(id);
            _boxHandler.RemoveCollection(boxes);
        }

        public BoxResponse GetBox(int id)
        {
            var result = _boxHandler.GetById(id);
            var resp = BoxToListItem(result);
            return resp;
        }
        public BoxResponseList GetBoxesByFormId(int id)
        {
            var result = _boxHandler.GetBoxesByFormId(id);
            var resp = BoxToListResponse(result);
            return resp;
        }
        public ModelBoxResponseList GetModelBoxesByFormId(int id)
        {
            var result = _boxHandler.GetModelBoxesByFormId(id);
            var models = BoxesToModelList(result);
            return models;
        }

        public BoxResponseList GetCopyBoxes(int id)
        {
            var result = _boxHandler.GetCopyBoxes(id);
            var boxes = BoxToListResponse(result);
            return boxes;
        }
        public ModelBoxResponseList GetBoxesByRequestId(int id)
        {
            var result = _boxHandler.GetBoxesByRequestId(id);
            var models = BoxesToModelList(result);
            return models;
        }
        

        public BoxResponseList GetBoxes()
        {
            var result = _boxHandler.GetAll();
            var resp = BoxToListResponse(result);
            return resp;
        }
        public BoxResponseList GetAllInclude()
        {
            var result = _boxHandler.GetAllInclude();
            var resp = BoxToListResponse(result);
            return resp;
        }
        public BoxResponse UpdateBox(int id, BoxRequest newBox)
        {
            var box = _boxHandler.GetById(id);
            var reqBox = BoxToDbItem(newBox);
            box.X = reqBox.X;
            box.Y = reqBox.Y;
            box.Width = reqBox.Width;
            box.Height = reqBox.Height;
            box.Type = reqBox.Type;
            box.SignerType = reqBox.SignerType;
            box.SignedStatus = reqBox.SignedStatus;
            box.Request = reqBox.Request;
            box.RequestId = reqBox.RequestId;
            box.Signature = reqBox.Signature;
            box.SignatureId = reqBox.SignatureId;
            box.FormId = reqBox.FormId;
            box.PageNumber = reqBox.PageNumber;
            box.IsModel = reqBox.IsModel;
            box.Text = reqBox.Text;
            box.Date = reqBox.Date;
            box.FormHeight = reqBox.FormHeight;
            box.FormWidth = reqBox.FormWidth;
            _boxHandler.Update(box);
            _boxHandler.SaveChanges();
            var resp = BoxToListItem(box);
            return resp;
        }

        public NumberResponse AddDataToBox(SignedBoxRequest NewBox)
        {
            try
            {
                var box = _boxHandler.GetById(NewBox.Id);
                box.SignedStatus = NewBox.SignedStatus;
                box.SignatureId = NewBox.SignatureId;
                box.Text = NewBox.Text;
                box.Date = NewBox.Date;
                //Grab Required Data for information to fill out the certification
                RequestEntity request = _requestHandler.First(x => x.Id == box.RequestId);
                UserEntity user = _userHandler.First(x => x.Id == request.SignerId);
                X509Item x509Item = new X509Item(X509Item.Country.US,
                 X509Item.Country.US, X509Item.Country.US,
                 user.Name, DateTime.Now, user.Email, "", "", "", "" ,"" ,"");
                string src = AppDomain.CurrentDomain.BaseDirectory + Constants.DocumentPath + NewBox.FilePath;
                string imgPath = AppDomain.CurrentDomain.BaseDirectory + Constants.SignaturePath + user.Id + ".png";
                string pfxPath = AppDomain.CurrentDomain.BaseDirectory + Constants.SignaturePath + user.Id + ".pfx";
                if (box.Type == BoxType.Initial)
                {
                    imgPath = AppDomain.CurrentDomain.BaseDirectory + Constants.InitialsPath + user.Id + ".png";
                    pfxPath = AppDomain.CurrentDomain.BaseDirectory + Constants.InitialsPath + user.Id + ".pfx";
                }
                SignatureItem sigItem = new SignatureItem(user.Password, "SHA256WithRSA", 2048, src, src, imgPath,  pfxPath);
                SignatureLibItem sigLib = InitializeCertification(sigItem, x509Item);
                SaveCertificate(sigLib, sigItem);
                SignDocument(box, sigItem, sigLib, user.Name);
                //Save New Images
                DocumentCore dc = DocumentCore.Load(src);
                DocumentPaginator dp = dc.GetPaginator(new PaginatorOptions());
                src = src.Replace(Path.GetFileName(src), "");
                for (int i = 0; i < dp.Pages.Count(); i++)
                {
                    if (File.Exists(src + i.ToString() + ".png"))
                    {
                        File.Delete(src + i.ToString() + ".png");
                    }
                    dp.Pages[i].Rasterize(72, Color.White).Save(src + i.ToString() + ".png");
                }
                //Take Pictures
                _boxHandler.Update(box);
                _boxHandler.SaveChanges();

                return new NumberResponse()
                {
                    Num = NumberToBooleanEnum.Success
                };
            }
            catch (Exception e){
                return new NumberResponse()
                {
                    Num = NumberToBooleanEnum.Failure
                };
            }
           
        }
        public BoxResponseList BoxToListResponse(IEnumerable<BoxEntity> me)
        {
            var resp = new BoxResponseList
            {
                TotalResults = me.Count(),
                BoxesList = new List<BoxResponse>()
            };
            foreach (BoxEntity box in me)
            {
                var item = BoxToListItem(box);
                resp.BoxesList.Add(item);
            }
            return resp;
        }
        public BoxResponse BoxToListItem(BoxEntity me)
        {
            return new BoxResponse()
            {
                Id = me.Id,
                X = me.X,
                Y = me.Y,
                Width = me.Width,
                Height = me.Height,
                Type = me.Type,
                SignerType = me.SignerType,
                SignedStatus = me.SignedStatus,
                RequestId = me.RequestId,
                Signature = _signatureEngine.SignatureToListItem(me.Signature),
                SignatureId = me.SignatureId,
                FormId = me.FormId,
                PageNumber = me.PageNumber,
                IsModel = me.IsModel,
                Text = me.Text,
                Date = me.Date,
                FormHeight = me.FormHeight,
                FormWidth = me.FormWidth
            };
        }
        public BoxEntity BoxToDbItem(BoxRequest me, BoxEntity updating = null)
        {
            if (updating == null)
            {
                updating = new BoxEntity();
            }
            updating.Id = me.Id;
            updating.X = me.X;
            updating.Y = me.Y;
            updating.Width = me.Width;
            updating.Height = me.Height;
            updating.Type = me.Type;
            updating.SignerType = me.SignerType;
            updating.SignedStatus = me.SignedStatus;
            if (me.RequestId != null)
            {
                updating.Request = _requestHandler.GetById(me.RequestId.Value);
            }
            updating.RequestId = me.RequestId;
            if (me.SignatureId != null)
            {
                updating.Signature = _signatureHandler.GetById(me.SignatureId.Value);
            }
            updating.SignatureId = me.SignatureId;
            /*if (me.FormId != null)
            {
                updating.Form = _formHandler.GetById(me.FormId.Value);
            }*/
            updating.FormId = me.FormId;
            updating.PageNumber = me.PageNumber;
            updating.IsModel = me.IsModel;
            updating.Text = me.Text;
            updating.Date = me.Date;
            updating.FormHeight = me.FormHeight;
            updating.FormWidth = me.FormWidth;
            return updating;
        }

    private ModelBoxResponseList BoxesToModelList(IEnumerable<BoxEntity> boxes)
        {
            var resp = new ModelBoxResponseList
            {
                TotalResults = boxes.Count(),
                BoxesList = new List<ModelBoxResponse>()
            };
            foreach (BoxEntity box in boxes)
            {
                var item = BoxToModelBox(box);
                resp.BoxesList.Add(item);
            }
            return resp;
        }
    private ModelBoxResponse BoxToModelBox(BoxEntity me)
        {
            return new ModelBoxResponse()
            {
                Id = me.Id,
                X = me.X,
                Y = me.Y,
                Width = me.Width,
                Height = me.Height,
                Type = me.Type,
                SignerType = me.SignerType,
                SignedStatus = me.SignedStatus,
                RequestId = me.RequestId,
                SignatureId = me.SignatureId,
                FormId = me.FormId,
                PageNumber = me.PageNumber,
                IsModel = me.IsModel,
                Text = me.Text,
                Date = me.Date,
                FormHeight = me.FormHeight,
                FormWidth = me.FormWidth
            };
        }
        #region LibraryFunctions
        private SignatureLibItem InitializeCertification(SignatureItem signItem, X509Item x509Item)
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
                result.InitializeCertificationStatus = new KeyValuePair<InitializeCertifcation.Error, string>(InitializeCertifcation.Error.Initialize, e.Message);
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
        private bool SaveCertificate(SignatureLibItem result, SignatureItem signItem)
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
        private MemoryStream CreateCertificate(SignatureLibItem result, SignatureItem signItem)
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
            var h = (float)(box.FormHeight - box.Y);
            appearance.SetVisibleSignature(new iTextSharp.text.Rectangle(x, y, w, h), box.PageNumber + 1, box.RequestId.ToString() + ":" + h + ":" + y + ":" + box.SignatureId + ":" + box.Id);
            if (box.Type == BoxType.Signature || box.Type == BoxType.Initial)
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

        private void SignDocument(BoxEntity box, SignatureItem signItem, SignatureLibItem signLib, string alias)
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
        #endregion


    }
}
