using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IGroupManager
    {
        GroupResponseList GetGroups();
        GroupResponseList GetGroupByFormId(int id);
        GroupResponseList GetGroupById(int id);
        GroupEntity CreateGroupEntity(GroupEntity newGroup);
        GroupEntity UpdateGroup(GroupEntity group, GroupEntity newGroup);
        GroupResponse Delete(int id);
        GroupResponseList GroupToListResponse(GroupEntity group);
        GroupResponse AddGroup(GroupRequest group, GroupEntity updating = null);
        GroupResponse EditGroup(int id, GroupRequest group, GroupEntity updating = null);
        GroupEntity RequestToEntity(GroupRequest group, [Optional] GroupEntity updating);

    }
}
