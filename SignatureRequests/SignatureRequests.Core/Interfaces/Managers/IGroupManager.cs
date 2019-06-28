using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IGroupManager
    {
        //need to be changed .
        GroupResponseList GetGroups();
        GroupResponseList GetGroupsById(int id);
        GroupEntity CreateGroupEntity(GroupEntity newGroup);
        GroupEntity UpdateGroup(GroupEntity group, GroupEntity newGroup);
        void Delete(int id);
        GroupResponseList GroupToListResponse(IEnumerable<GroupEntity> groups);
    }
}
