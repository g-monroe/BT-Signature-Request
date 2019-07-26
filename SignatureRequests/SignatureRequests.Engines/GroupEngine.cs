using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Engines
{
    public class GroupEngine : IGroupEngine
    {
        private readonly IUserHandler _userHandler;
        private readonly IUserEngine _userEngine;
        private readonly IGroupHandler _groupHandler;
        private readonly ISignatureEngine _signatureEngine;
        public GroupEngine(IUserHandler userHandler, IGroupHandler groupHandler, ISignatureEngine signatureEngine, IUserEngine userEngine)
        {
            _userHandler = userHandler;
            _groupHandler = groupHandler;
            _signatureEngine = signatureEngine;
            _userEngine = userEngine;
        }
        public GroupResponse GroupToListItem(GroupEntity group)
        {
            if (group.RequestEntities == null)
            {
                group.RequestEntities = new List<RequestEntity>();
            }
            var resp = new RequestResponseList
            {
                TotalResults = group.RequestEntities.Count(),
                RequestsList = new List<RequestResponse>()
            };
            foreach (RequestEntity request in group.RequestEntities)
            {
                if (request.BoxEntities == null)
                {
                    request.BoxEntities = new List<BoxEntity>();
                }
                var respBoxes = new BoxResponseList
                {
                    TotalResults = request.BoxEntities.Count(),
                    BoxesList = new List<BoxResponse>()
                };
                foreach (BoxEntity box in request.BoxEntities)
                {
                    var item = new BoxResponse()
                    {
                        Id = box.Id,
                        X = box.X,
                        Y = box.Y,
                        Width = box.Width,
                        Height = box.Height,
                        Type = box.Type,
                        SignerType = box.SignerType,
                        SignedStatus = box.SignedStatus,
                        RequestId = box.RequestId,
                        SignatureId = box.SignatureId,
                        Form = null,
                        FormId = box.FormId,
                        PageNumber = box.PageNumber,
                        IsModel = box.IsModel,
                        Text = box.Text,
                        Date = box.Date
                    };
                    respBoxes.BoxesList.Add(item);
                }
                resp.RequestsList.Add(new RequestResponse()
                {
                    Id = request.Id,
                    Signer = _userEngine.UserToListItem(request.Signer),
                    SignerId = request.SignerId,
                    Requestor = _userEngine.UserToListItem(request.Requestor),
                    RequestorId = request.RequestorId,
                    Status = request.Status,
                    SentDate = request.SentDate,
                    Boxes = respBoxes
                });
            }
            group.Form.GroupEntities = null;
            return new GroupResponse()
            {
                Id = group.Id,
                Form = FormToListItem(group.Form),
                FormId = group.FormId,
                Title = group.Title,
                Description = group.Description,
                DueDate = group.DueDate,
                CreateDate = group.CreateDate,
                Status = group.Status,
                RequestEntities = resp
            };
        }

        public FormResponse FormToListItem(FormEntity form)
        {
            if(form == null)
            {
                return new FormResponse();
            }
            if (form.GroupEntities == null)
            {
                form.GroupEntities = new List<GroupEntity>();
            }
            var resp = new GroupResponseList
            {
                TotalResults = form.GroupEntities.Count(),
                GroupsList = new List<GroupResponse>()
            };
            foreach (GroupEntity group in form.GroupEntities)
            {
                resp.GroupsList.Add(GroupToListItem(group));
            }
            return new FormResponse()
            {
                Id = form.Id,
                CreateDate = form.CreateDate,
                Description = form.Description,
                FilePath = form.FilePath,
                Title = form.Title,
                User = _userEngine.UserToListItem(form.User),
                UserId = form.UserId,
                NumPages = form.NumPages,
                GroupEntities = resp
            };
        }

        public RequestResponse RequestToListItem(RequestEntity request)
        {
            var respBoxes = new BoxResponseList
            {
                TotalResults = 0,
                BoxesList = new List<BoxResponse>()
            };
            if(request == null)
            {
                return new RequestResponse();
            }
            if (request.BoxEntities == null)
            {
                request.BoxEntities = new List<BoxEntity>();
            }
            foreach (BoxEntity box in request.BoxEntities)
            {
                var item = new BoxResponse()
                {
                    Id = box.Id,
                    X = box.X,
                    Y = box.Y,
                    Width = box.Width,
                    Height = box.Height,
                    Type = box.Type,
                    SignerType = box.SignerType,
                    SignedStatus = box.SignedStatus,
                    RequestId = box.RequestId,

                    SignatureId = box.SignatureId,
                    Form = FormToListItem(box.Form),
                    FormId = box.FormId,
                    PageNumber = box.PageNumber,
                    IsModel = box.IsModel,
                    Text = box.Text,
                    Date = box.Date
                };
                respBoxes.BoxesList.Add(item);
            }
            return new RequestResponse()
            {
                Id = request.Id,
                Signer = _userEngine.UserToListItem(request.Signer),
                SignerId = request.SignerId,
                Group = GroupToListItem(request.Group),
                GroupId = request.GroupId,
                Requestor = _userEngine.UserToListItem(request.Requestor),
                RequestorId = request.RequestorId,
                Status = request.Status,
                SentDate = request.SentDate,
                Boxes = respBoxes
            };
        }

        public RequestEntity RequestToEntity(RequestRequest request, RequestEntity updating = null)
        {
            if (updating == null)
            {
                updating = new RequestEntity();
            }
            updating.Id = request.Id;
            updating.Signer = _userHandler.GetById(request.SignerId);
            updating.SignerId = request.SignerId;
            updating.Group = _groupHandler.GetById(request.GroupId);
            updating.GroupId = request.GroupId;
            updating.Requestor = _userHandler.GetById(request.RequestorId);
            updating.RequestorId = request.RequestorId;
            updating.Status = request.Status;
            updating.SentDate = request.SentDate;
            return updating;
        }

        public FormEntity FormToEntity(FormRequest form, FormEntity updating = null)
        {
            if (updating == null)
            {
                updating = new FormEntity();
            }
            updating.Id = form.Id;
            updating.FilePath = form.FilePath;
            updating.Title = form.Title;
            updating.Description = form.Description;
            updating.CreateDate = form.CreateDate;
            updating.User = _userHandler.GetById(form.UserId);
            updating.UserId = form.UserId;
            updating.NumPages = form.NumPages;
            return updating;
        }
    }
}
