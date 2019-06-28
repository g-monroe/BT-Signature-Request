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
    public class GroupManager : IGroupManager
    {
        private readonly IGroupHandler _groupHandler;
        public GroupManager(IGroupHandler groupHandler)
        {
            _groupHandler = groupHandler;
        }

        public GroupEntity CreateGroupEntity(GroupEntity newGroup)
        {
            _groupHandler.Insert(newGroup);
            _groupHandler.SaveChanges();
            return newGroup;
        }

        public void Delete(int id)
        {
            var result = _groupHandler.GetById(id);
            _groupHandler.Delete(result);
            _groupHandler.SaveChanges();
        }

        public GroupResponseList GetGroupsById(int id)
        {
            return GroupToListResponse(_groupHandler.GetAllByFormId(id));
        }

        public GroupEntity UpdateGroup(GroupEntity group, GroupEntity newGroup)
        {
            var result = _groupHandler.GetById(group.Id);
            result.FormEntity = newGroup.FormEntity;
            result.FormId = newGroup.FormId;
            result.Request = newGroup.Request;
            result.RequestId = newGroup.RequestId;
            return group;
        }

        public GroupResponseList GroupToListResponse(IEnumerable<GroupEntity> groups)
        {
            var resp = new GroupResponseList
            {
                TotalResults = groups.Count(),
                GorupsList = new List<GroupResponse>()
            };
            foreach (GroupEntity request in groups)
            {
                resp.GorupsList.Add(GroupToListItem(request));
            }
            return resp;
        }
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

        public GroupResponseList GetGroups()
        {
            return GroupToListResponse(_groupHandler.GetAllInclude());
        }

    }
}
