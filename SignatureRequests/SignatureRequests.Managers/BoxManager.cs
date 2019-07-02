using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class BoxManager : IBoxManager
    {
        private readonly IBoxHandler _boxHandler;
        private readonly IRequestManager _requestManager;
        public BoxManager(IBoxHandler boxHandler, IRequestManager requestManager)
        {
            _boxHandler = boxHandler;
            _requestManager = requestManager;

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
            box.Length = reqBox.Length;
            box.Type = reqBox.Type;
            box.SignerType = reqBox.SignerType;
            box.SignedStatus = reqBox.SignedStatus;
            box.Request = reqBox.Request;
            box.RequestId = reqBox.RequestId;
            box.Signature = reqBox.Signature;
            box.SignatureId = reqBox.SignatureId;
            _boxHandler.Update(box);
            _boxHandler.SaveChanges();
            var resp = BoxToListItem(box);
            return resp;
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
                Length = me.Length,
                Type = me.Type,
                SignerType = me.SignerType,
                SignedStatus = me.SignedStatus,
                Request = _requestManager.RequestToListItem(me.Request),
                RequestId = me.RequestId,
                Signature = me.Signature,
                SignatureId = me.SignatureId,
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
            updating.Length = me.Length;
            updating.Type = me.Type;
            updating.SignerType = me.SignerType;
            updating.SignedStatus = me.SignedStatus;
            updating.Request = _requestManager.RequestToEntity(me.Request, null);
            updating.RequestId = me.RequestId;
            updating.Signature = me.Signature;
            updating.SignatureId = me.SignatureId;
            return updating;
        }
    
    }
}
