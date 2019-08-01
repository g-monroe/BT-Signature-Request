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

namespace SignatureRequests.Managers
{
    public class BoxManager : IBoxManager
    {
        private readonly IBoxHandler _boxHandler;
        private readonly IRequestHandler _requestHandler;
        private readonly ISignatureHandler _signatureHandler;
        private readonly IFormHandler _formHandler;
        private readonly IUserHandler _userHandler;
        private readonly ISignatureLibManager _signatureLibManager;
        private readonly ISignatureEngine _signatureEngine;
        public BoxManager(IBoxHandler boxHandler, IRequestHandler requestHandler, ISignatureHandler signatureHandler, IFormHandler formHandler, IGroupEngine groupEngine, ISignatureEngine signatureEngine, IUserHandler userHandler, ISignatureLibManager signatureLibManager)
        {
            _boxHandler = boxHandler;
            _requestHandler = requestHandler;
            _signatureHandler = signatureHandler;
            _formHandler = formHandler;
            _userHandler = userHandler;
            _signatureLibManager = signatureLibManager;
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
            box.Form = reqBox.Form;
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
                 user.Name, DateTime.Now, user.Email, "M", "GM", "IA", "123123", "Test", "builderTrend");
                string tempDir = AppDomain.CurrentDomain.BaseDirectory + Constants.DocumentPath + NewBox.FilePath.Split('.')[0] + "Temp";
                SignatureItem sigItem = new SignatureItem(user.Password, "SHA256WithRSA", 2048, AppDomain.CurrentDomain.BaseDirectory  + Constants.DocumentPath + NewBox.FilePath, AppDomain.CurrentDomain.BaseDirectory  + Constants.DocumentPath + NewBox.FilePath, AppDomain.CurrentDomain.BaseDirectory + Constants.SignaturePath + user.Id + ".png", AppDomain.CurrentDomain.BaseDirectory + Constants.SignaturePath + user.Id + ".pfx", tempDir);
                SignatureLibItem sigLib = _signatureLibManager.InitializeCertification(sigItem, x509Item);
                _signatureLibManager.SaveCertificate(sigLib, sigItem);
                _signatureLibManager.SignDocument(box, sigItem, sigLib, user.Name);
                string src = AppDomain.CurrentDomain.BaseDirectory + Constants.DocumentPath + NewBox.FilePath;
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
            if (me.FormId != null)
            {
                updating.Form = _formHandler.GetById(me.FormId.Value);
            }
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

    }
}
