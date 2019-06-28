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
        FormResponseList GetGroups();
        FormResponseList GetGroupsById(int id);
        FormEntity CreateGroupEntity(FormEntity newForm);
        FormEntity GroupForm(FormEntity form, FormEntity newForm);
        void Delete(int id);
        FormResponseList GroupToListResponse(IEnumerable<GroupEntity> forms);
        FormResponse EditGroup(int id, GroupRequest group, GroupEntity updating = null);
        FormResponse AddGroup(FormRequest form, FormEntity updating = null);
    }
}
