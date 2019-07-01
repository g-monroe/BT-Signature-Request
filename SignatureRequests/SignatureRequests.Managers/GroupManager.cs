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
        public GroupManager(IGroupHandler groupHandler, IGroupEngine groupEngine)
        {
            _groupHandler = groupHandler;
            _groupEngine = groupEngine;
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
            _groupHandler.SaveChanges();
            return group;
        }

        private GroupResponseList GroupToListResponse(IEnumerable<GroupEntity> groups)
        {
            var resp = new GroupResponseList
            {
                TotalResults = groups.Count(),
                GorupsList = new List<GroupResponse>()
            };
            foreach (GroupEntity request in groups)
            {
                resp.GorupsList.Add(_groupEngine.GroupToListItem(request));
            }
            return resp;
        }
      

        public GroupResponseList GetGroups()
        {
            return GroupToListResponse(_groupHandler.GetAllInclude());
        }
    }
}
