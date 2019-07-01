using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class GroupResponse
    {
        public int Id { get; set; }
        public RequestEntity Request { get; set; }
        public int RequestId { get; set; }
        public FormEntity FormEntity { get; set; }
        public int FormId { get; set; }
        public RequestResponseList RequestEntities { get; set; }
    }
}
