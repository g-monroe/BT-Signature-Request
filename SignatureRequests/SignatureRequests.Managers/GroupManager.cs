using SautinSoft.Document;
using SignatureRequests.Core;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.IO;
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
        public void MakeCopy(int id, int groupId)
        {
            var filePath = _formHandler.GetById(id).FilePath;
            const string path = Constants.DocumentPath;
            string[] fileNameSplit = filePath.Split('.');
            string fullName = string.Join("", fileNameSplit.Take(fileNameSplit.Length - 1));
            Directory.CreateDirectory(AppDomain.CurrentDomain.BaseDirectory + path + fullName + "\\" + groupId);
            File.Copy(AppDomain.CurrentDomain.BaseDirectory + path + filePath, AppDomain.CurrentDomain.BaseDirectory + path + fullName + "\\" + groupId + "\\" + filePath);
            DocumentCore dc = DocumentCore.Load(AppDomain.CurrentDomain.BaseDirectory + path + filePath);
            DocumentPaginator dp = dc.GetPaginator(new PaginatorOptions());
            for (int i = 0; i < dp.Pages.Count(); i++)
            {
                dp.Pages[i].Rasterize(72, Color.White).Save(AppDomain.CurrentDomain.BaseDirectory + path + fullName + "\\" + groupId + "\\" + i.ToString() + ".png");
            }

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
            var resp = new GroupResponseList {
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

            resp.GroupsList.Add(_groupEngine.GroupToListItem(group));

            return resp;
        }

        public GroupResponseList GetGroups()
        {
            return GroupsToListResponse(_groupHandler.GetAllInclude());
        }

        public GroupResponse AddGroup(GroupRequest group, GroupEntity updating = null)
        {
            var newEntity = RequestToEntity(group, updating);
            var entity = CreateGroupEntity(newEntity);
            return _groupEngine.GroupToListItem(entity);
        }

        public GroupResponse EditGroup(int id, GroupRequest group, GroupEntity updating = null)
        {
            updating = RequestToEntity(group, updating);
            var currentGroup = _groupHandler.GetById(id);
            var result = UpdateGroup(currentGroup, updating);
            return _groupEngine.GroupToListItem(result);
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
            updating.Title = group.Title;
            updating.Description = group.Description;
            updating.CreateDate = group.CreateDate;
            updating.DueDate = group.DueDate;
            updating.Status = group.Status;
            return updating;
        }

    }
}
