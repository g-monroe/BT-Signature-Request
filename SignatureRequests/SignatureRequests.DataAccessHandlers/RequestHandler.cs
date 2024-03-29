﻿using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace SignatureRequests.DataAccessHandlers
{
    public class RequestHandler : BaseHandler<RequestEntity>, IRequestHandler
    {
        public RequestHandler(SignatureRequestsContext context) : base(context)
        {
        }
        public RequestEntity GetById(int id)
        {
            return _context.Requests.Include("BoxEntities").First(s => s.Id == id);
        }
        public IEnumerable<RequestEntity> GetAllByFormId(int id)
        {
            return GetSelectIncludes(s => s.Id == id, "BoxEntities");
        }
        public IEnumerable<RequestEntity> GetAllInclude()
        {
            return GetIncludes("BoxEntities");
        }
        public IEnumerable<RequestEntity> GetAllBySignerId(int id)
        {
            return Get(s => s.SignerId == id);
        }


    }
}
