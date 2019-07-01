using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Engines
{
    public class GroupEngine : IGroupEngine
    {
        public GroupResponse GroupToListItem(GroupEntity group)
        {
            var resp = new RequestResponseList
            {
                TotalResults = group.RequestEntities.Count(),
                RequestsList = new List<RequestResponse>()
            };
            if (group.RequestEntities == null)
            {
                group.RequestEntities = new List<RequestEntity>();
            }
            foreach (RequestEntity request in group.RequestEntities)
            {
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
                        Length = box.Length,
                        Type = box.Type,
                        SignerType = box.SignerType,
                        SignedStatus = box.SignedStatus,
                        RequestId = box.RequestId,
                        Signature = box.Signature,
                        SignatureId = box.SignatureId,
                    };
                    respBoxes.BoxesList.Add(item);
                }
                resp.RequestsList.Add(new RequestResponse()
                {
                    Id = request.Id,
                    Signer = request.Signer,
                    SignerId = request.SignerId,
                    Requestor = request.Requestor,
                    RequestorId = request.RequestorId,
                    FormId = request.FormId,
                    Status = request.Status,
                    SentDate = request.SentDate,
                    Boxes = respBoxes
                });
            }
            return new GroupResponse()
            {
                Id = group.Id,
                Request = group.Request,
                RequestId = group.RequestId,
                FormEntity = group.FormEntity,
                FormId = group.FormId,
                RequestEntities = resp
            };
        }
    }
}
