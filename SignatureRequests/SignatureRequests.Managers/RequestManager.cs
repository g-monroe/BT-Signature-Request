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
    public class RequestManager : IRequestManager
    {
        private readonly IRequestHandler _requestHandler;
        private readonly IUserHandler _userHandler;
        private readonly IFormHandler _formHandler;

        public RequestManager(IRequestHandler requestHandler, IUserHandler userHandler, IFormHandler formHandler)
        {
            _requestHandler = requestHandler;
            _userHandler = userHandler;
            _formHandler = formHandler;
        }

        public RequestResponseList GetRequests()
        {
            var requests = _requestHandler.GetAll();
            return RequestToListResponse(requests);
        }
        public RequestResponseList GetRequestsById(int id)
        {
            var requests = _requestHandler.GetAllById(id);
            return RequestToListResponse(requests);
        }
        public RequestEntity GetRequest(int id)
        {
            return _requestHandler.GetById(id);
        }
        public RequestEntity CreateRequestEntity(RequestEntity newRequest)
        {
            var result = _requestHandler.Insert(newRequest);
            _requestHandler.SaveChanges();
            return result;
        }
        public RequestEntity UpdateRequest(RequestEntity request, RequestEntity newRequest)
        {
            request.Signer = newRequest.Signer;
            request.SignerId = newRequest.SignerId;
            request.Requestor = newRequest.Requestor;
            request.RequestorId = newRequest.RequestorId;
            request.Form = newRequest.Form;
            request.FormId = newRequest.FormId;
            request.Status = newRequest.Status;
            request.SentDate = newRequest.SentDate;
            _requestHandler.Update(request);
            _requestHandler.SaveChanges();
            return request;
        }
        public void Delete(int id)
        {
            var request = GetRequest(id);
            _requestHandler.Delete(request);
            _requestHandler.SaveChanges();
        }
        public RequestResponseList RequestToListResponse(IEnumerable<RequestEntity> requests)
        {
            var resp = new RequestResponseList
            {
                TotalResults = requests.Count(),
                RequestsList = new List<RequestResponse>()
            };
            foreach (RequestEntity request in requests)
            {
                resp.RequestsList.Add(RequestToListItem(request));
            }
            return resp;
        }
        public RequestResponse AddRequest(RequestRequest request, RequestEntity updating = null)
        {
            var newEntity = RequestToEntity(request, updating);
            var entity = CreateRequestEntity(newEntity);
            return RequestToListItem(entity);
        }
        public RequestResponse EditRequest(int id, RequestRequest request, RequestEntity updating = null)
        {
            updating = RequestToEntity(request, updating);
            var currentRequest = GetRequest(id);
            var result = UpdateRequest(currentRequest, updating);
            return RequestToListItem(result);
        }
        public RequestResponse RequestToListItem(RequestEntity request)
        {
            return new RequestResponse()
            {
                Id = request.Id,
                Signer = request.Signer,
                SignerId = request.SignerId,
                Requestor = request.Requestor,
                RequestorId = request.RequestorId,
                Form = request.Form,
                FormId = request.FormId,
                Status = request.Status,
                SentDate = request.SentDate
            };
        }
        public RequestEntity RequestToEntity(RequestRequest request, RequestEntity updating)
        {
            if (updating == null)
            {
                updating = new RequestEntity();
            }
            updating.Id = request.Id;
            updating.Signer = _userHandler.GetById(request.SignerId);
            updating.SignerId = request.SignerId;
            updating.Requestor = _userHandler.GetById(request.RequestorId);
            updating.RequestorId = request.RequestorId;
            updating.Form = _formHandler.GetById(request.FormId);
            updating.FormId = request.FormId;
            updating.Status = request.Status;
            updating.SentDate = request.SentDate;
            return updating;
        }
    }
}
