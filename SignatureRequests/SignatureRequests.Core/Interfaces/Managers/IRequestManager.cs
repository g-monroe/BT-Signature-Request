﻿using SignatureRequests.Core.Entities;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Managers
{
    public interface IRequestManager
    {
        RequestResponseList GetRequests();
        RequestResponseList GetRequestsById(int id);
        RequestEntity GetRequest(int id);
        RequestEntity CreateRequestEntity(RequestEntity newRequest);
        RequestEntity UpdateRequest(RequestEntity request, RequestEntity newRequest);
        void Delete(int id);
        RequestResponseList RequestToListResponse(IEnumerable<RequestEntity> requests);
        RequestResponse EditRequest(int id, RequestRequest request, RequestEntity updating = null);
        RequestResponse AddRequest(RequestRequest request, RequestEntity updating = null);
    }
}