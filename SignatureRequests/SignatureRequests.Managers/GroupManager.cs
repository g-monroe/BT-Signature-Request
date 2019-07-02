using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
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
        private readonly IGroupEngine _groupEngine;
        private readonly IFormHandler _formHandler;
        public GroupManager(IGroupHandler groupHandler, IGroupEngine groupEngine, IFormHandler formHandler)
        {
            _groupHandler = groupHandler;
            _groupEngine = groupEngine;
            _formHandler = formHandler;
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

        public GroupResponseList GetGroupByFormId(int id)
        {
            return GroupsToListResponse(_groupHandler.GetAllByFormId(id));
        }

        public GroupResponseList GetGroupById(int id)
        {
            return GroupsToListResponse(_groupHandler.GetGroupById(id));
        }

        public GroupEntity UpdateGroup(GroupEntity group, GroupEntity newGroup)
        {
            var result = _groupHandler.GetById(group.Id);
            result.Form = newGroup.Form;
            result.FormId = newGroup.FormId;
            _groupHandler.SaveChanges();
            return group;
        }

        private GroupResponseList GroupsToListResponse(IEnumerable<GroupEntity> groups)
        {
            var resp = new GroupResponseList
            {
                TotalResults = groups.Count(),
                GroupsList = new List<GroupResponse>()
            };
            foreach (GroupEntity request in groups)
            {
                resp.GroupsList.Add(_groupEngine.GroupToListItem(request));
            }
            return resp;
        }

        public GroupResponseList GroupToListResponse(GroupEntity group)
        {
            var resp = new GroupResponseList
            {
                TotalResults = 1,
                GroupsList = new List<GroupResponse>()
            };

            resp.GroupsList.Add(GroupToListItem(group));

            return resp;
        }

        public GroupResponseList GetGroups()
        {
            return GroupsToListResponse(_groupHandler.GetAllInclude());
        }
        public GroupEntity GetGroup(int id)
        {
            return _groupHandler.GetById(id);
        }
        public GroupResponse AddGroup(GroupRequest group, GroupEntity updating = null)
        {
            var newEntity = RequestToEntity(group, updating);
            var entity = CreateGroupEntity(newEntity);
            return GroupToListItem(entity);
        }

        public GroupResponse EditGroup(int id, GroupRequest group, GroupEntity updating = null)
        {
            updating = RequestToEntity(group, updating);
            var currentGroup = GetGroup(id);
            var result = UpdateGroup(currentGroup, updating);
            return GroupToListItem(result);
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
                resp.RequestsList.Add(_groupEngine.RequestToListItem(request));
            }
            return new GroupResponse()
            {
                Id = group.Id,
                Form = _groupEngine.FormToListItem(group.Form),
                FormId = group.FormId,
                RequestEntities = resp
            };
        }
        public GroupEntity RequestToEntity(GroupRequest group, GroupEntity updating)
        {
            if (updating == null)
            {
                updating = new GroupEntity();
            }
            updating.Id = group.Id;
            updating.Form = _formHandler.GetById(group.FormId);
            updating.FormId = group.FormId;
            return updating;
        }
    }
}
