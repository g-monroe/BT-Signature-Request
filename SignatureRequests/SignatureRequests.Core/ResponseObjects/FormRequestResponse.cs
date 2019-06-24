using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class FormRequestResponse
    {
        public virtual FormResponse Form { get; set; }
        public virtual RequestResponseList Requests { get; set; }
    }
}
