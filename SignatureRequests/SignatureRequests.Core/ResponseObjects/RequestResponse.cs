using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class RequestResponse
    {
        public int Id { get; set; }
        public virtual UserResponse Signer { get; set; }
        public int SignerId { get; set; }
        public virtual GroupResponse Group { get; set; }
        public int GroupId { get; set; }
        public virtual UserResponse Requestor { get; set; }
        public int RequestorId { get; set; }
        public string Status { get; set; }
        public DateTime SentDate { get; set; }
        public BoxResponseList Boxes { get; set; }
    }
}
