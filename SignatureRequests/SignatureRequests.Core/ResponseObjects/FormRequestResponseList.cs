using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class FormRequestResponseList
    {
        public int TotalResults { get; set; }
        public List<FormRequestResponse> FormRequestsList { get; set; }
    }
}
