using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class RequestRequest
    {
        public int Id { get; set; }
        public virtual UserEntity Signer { get; set; }
        public int SignerId { get; set; }
        public virtual GroupRequest Group { get; set; }
        public int GroupId { get; set; }
        public virtual UserEntity Requestor { get; set; }
        public int RequestorId { get; set; }
        public string Status { get; set; }
        public DateTime SentDate { get; set; }
    }
}
