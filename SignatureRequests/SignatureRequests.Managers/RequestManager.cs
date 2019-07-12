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
    public class RequestManager : IRequestManager
    {
        private readonly IRequestHandler _requestHandler;
        private readonly IUserHandler _userHandler;
        private readonly IFormHandler _formHandler;
        private readonly IGroupEngine _groupEngine;
        private readonly IGroupHandler _groupHandler;
        private readonly IUserEngine _userEngine;

        public RequestManager(IRequestHandler requestHandler, IUserHandler userHandler, IFormHandler formHandler, IGroupEngine groupEngine, IGroupHandler groupHandler, IUserEngine userEngine)
        {
            _requestHandler = requestHandler;
            _userHandler = userHandler;
            _formHandler = formHandler;
            _groupEngine = groupEngine;
            _groupHandler = groupHandler;
            _userEngine = userEngine;
        }

        public RequestResponseList GetRequests()
        {
            var requests = _requestHandler.GetAllInclude();
            return RequestToListResponse(requests);
        }
        public RequestResponse GetRequestsById(int id)
        {
            var requests = _requestHandler.GetAllById(id);
            return RequestToResponse(requests);
        }
        public RequestResponseList GetRequestsByFormId(int id)
        {
            var requests = _requestHandler.GetAllByFormId(id);
            return RequestToListResponse(requests);
        }
        public RequestEntity GetRequest(int id)
        {
            return _requestHandler.GetById(id);
        }

        public RequestToCompleteResponse GetRequestByRequestId(int id )
        {
            var request = _requestHandler.GetAllById(id);
            return RequestEntityToComplete(request);

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
            request.Group = newRequest.Group;
            request.GroupId = newRequest.GroupId;
            request.Requestor = newRequest.Requestor;
            request.RequestorId = newRequest.RequestorId;
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
                resp.RequestsList.Add(_groupEngine.RequestToListItem(request));
            }
            return resp;
        }
        public RequestResponse AddRequest(RequestRequest request, RequestEntity updating = null)
        {
            var newEntity = _groupEngine.RequestToEntity(request, updating);
            var entity = CreateRequestEntity(newEntity);
            return _groupEngine.RequestToListItem(entity);
        }
        public RequestResponse EditRequest(int id, RequestRequest request, RequestEntity updating = null)
        {
            updating = _groupEngine.RequestToEntity(request, updating);
            var currentRequest = GetRequest(id);
            var result = UpdateRequest(currentRequest, updating);
            return _groupEngine.RequestToListItem(result);
        }

        private RequestResponse RequestToResponse(RequestEntity data)
        {
            return new RequestResponse(){
                Id = data.Id,
                Signer = _userEngine.UserToListItem(data.Signer),
                SignerId = data.SignerId,
                Group = _groupEngine.GroupToListItem(data.Group),
                GroupId = data.GroupId,
                Requestor = _userEngine.UserToListItem(data.Requestor),
                RequestorId = data.RequestorId,
                Status = data.Status,
                SentDate = data.SentDate,
                Boxes = _groupEngine.BoxEntitiesToResponseList(data.BoxEntities)
            };
        }

        private RequestToCompleteResponse RequestEntityToComplete(RequestEntity data){
            return new RequestToCompleteResponse(){
                Id = data.Id,
                SignerId = data.SignerId,
                RequestorId = data.RequestorId,
                Status = data.Status,
                SentDate = data.SentDate,
                DueDate = data.SentDate, //TODO
                Boxes = _groupEngine.BoxEntitysToCompleteList(data.BoxEntities)
            };
        }
        
    }
}
