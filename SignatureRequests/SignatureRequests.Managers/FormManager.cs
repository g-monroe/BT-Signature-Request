using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
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
        public FormManager(IFormHandler formHandler, IUserHandler userHandler)
        {
            _formHandler = formHandler;
            _userHandler = userHandler;
        }
        public FormResponseList GetForms()
        {
            var forms = _formHandler.GetAllInclude();
            return FormToListResponse(forms);
        }
        public FormResponseList GetFormsById(int id)
        {
            var forms = _formHandler.GetAllById(id);
            return FormToListResponse(forms);
        }
        public FormResponseList GetFormsByUserId(int id)
        {
            var forms = _formHandler.GetAllByUserId(id);
            return FormToListResponse(forms);
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
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                string workingDirectory = System.Reflection.Assembly.GetExecutingAssembly().Location;
                File.WriteAllBytes(AppDomain.CurrentDomain.BaseDirectory + @"\assets\v1\documents\" + filename,
                    buffer);
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
        public FormResponseList FormToListResponse(IEnumerable<FormEntity> forms)
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
            var resp = new RequestResponseList
            {
                TotalResults = 0,
                RequestsList = new List<RequestResponse>()
            };
            if (form.RequestEntities == null)
            {
                form.RequestEntities = new List<RequestEntity>();
            }
            foreach (RequestEntity request in form.RequestEntities)
            {
                var respBoxes = new BoxResponseList
                {
                    TotalResults = 0,
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
             return new FormResponse()
            {
                Id = form.Id,
                CreateDate = form.CreateDate,
                Description = form.Description,
                FilePath = form.FilePath,
                Title = form.Title,
                User = form.User,
                UserId = form.UserId,
                RequestEntities = resp
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
