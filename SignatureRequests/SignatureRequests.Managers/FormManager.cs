using SautinSoft.Document;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class FormManager : IFormManager
    {
        private readonly IFormHandler _formHandler;
        private readonly IUserHandler _userHandler;
        private readonly IGroupEngine _groupEngine;
        public FormManager(IFormHandler formHandler, IUserHandler userHandler, IGroupEngine groupEngine)
        {
            _formHandler = formHandler;
            _userHandler = userHandler;
            _groupEngine = groupEngine;
        }
        public FormResponseList GetForms()
        {
            var forms = _formHandler.GetAllInclude();
            return FormsToListResponse(forms);
        }
        public FormResponseList GetFormById(int id)
        {
            var form = _formHandler.GetByFormId(id);
            return FormToListResponse(form);
        }
        public FormResponseList GetFormsByUserId(int id)
        {
            var forms = _formHandler.GetAllByUserId(id);
            return FormsToListResponse(forms);
        }
        public FormEntity GetForm(int id)
        {
            return _formHandler.GetById(id);
        }
        public FormEntity CreateFormEntity(FormEntity newForm)
        {
            FormEntity result = _formHandler.Insert(newForm);
            _formHandler.SaveChanges();
            return result;
        }
        public async Task SaveDocumentAsync(MultipartMemoryStreamProvider provider)
        {
            foreach (var file in provider.Contents)
            {
                const string path = Constants.DocumentPath;
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                string workingDirectory = System.Reflection.Assembly.GetExecutingAssembly().Location;
                File.WriteAllBytes(AppDomain.CurrentDomain.BaseDirectory + path  + filename,
                    buffer);
                DocumentCore dc = DocumentCore.Load(AppDomain.CurrentDomain.BaseDirectory + path + filename);
                DocumentPaginator dp = dc.GetPaginator(new PaginatorOptions());
                dp.Pages[0].Rasterize(800, Color.White).Save(AppDomain.CurrentDomain.BaseDirectory + path + filename + ".png");
            }
        }
        public FormEntity UpdateForm(FormEntity form, FormEntity newForm)
        {
            form.CreateDate = newForm.CreateDate;
            form.Description = newForm.Description;
            form.FilePath = newForm.FilePath;
            form.Title = newForm.Title;
            form.User = newForm.User;
            form.UserId = newForm.UserId;
            _formHandler.Update(form);
            _formHandler.SaveChanges();
            return form;
        }
        public void Delete(int id)
        {
            var form = GetForm(id);
            _formHandler.Delete(form);
            _formHandler.SaveChanges();
        }
        public FormResponseList FormsToListResponse(IEnumerable<FormEntity> forms)
        {
            var resp = new FormResponseList
            {
                TotalResults = forms.Count(),
                FormsList = new List<FormResponse>()
            };

            foreach (FormEntity form in forms)
            {
                resp.FormsList.Add(FormToListItem(form));
            }
            return resp;
        }
        public FormResponseList FormToListResponse(FormEntity form)
        {
            var resp = new FormResponseList
            {
                TotalResults = 1,
                FormsList = new List<FormResponse>()
            };
            
            resp.FormsList.Add(FormToListItem(form));
            
            return resp;
        }
        public FormResponse AddForm(FormRequest form, FormEntity updating = null)
        {
            var newEntity = RequestToEntity(form, updating);
            var entity = CreateFormEntity(newEntity);
            return FormToListItem(entity);
        }
        public FormResponse EditForm(int id, FormRequest form, FormEntity updating = null)
        {
            updating = RequestToEntity(form, updating);
            var currentForm = GetForm(id);
            var result = UpdateForm(currentForm, updating);
            return FormToListItem(result);
        }
        private FormResponse FormToListItem(FormEntity form)
        {
            var resp = new GroupResponseList
            {
                TotalResults = form.GroupEntities.Count(),
                GorupsList = new List<GroupResponse>()
            };
            if (form.GroupEntities == null)
            {
                form.GroupEntities = new List<GroupEntity>();
            }
            foreach (GroupEntity group in form.GroupEntities)
            {
                resp.GorupsList.Add(_groupEngine.GroupToListItem(group));
            }
             return new FormResponse()
            {
                Id = form.Id,
                CreateDate = form.CreateDate,
                Description = form.Description,
                FilePath = form.FilePath,
                Title = form.Title,
                User = form.User,
                UserId = form.UserId,
                GroupEntities = resp
            };
        }
        private FormEntity RequestToEntity(FormRequest form, FormEntity updating)
        {
            if (updating == null)
            {
                updating = new FormEntity();
            }
            updating.Id = form.Id;
            updating.CreateDate = form.CreateDate;
            updating.Description = form.Description;
            updating.FilePath = form.FilePath;
            updating.Title = form.Title;
            updating.User = _userHandler.GetById(form.UserId);
            updating.UserId = form.UserId;
            return updating;
        }
    }
}
