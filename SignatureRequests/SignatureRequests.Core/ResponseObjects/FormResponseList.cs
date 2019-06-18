using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class FormResponseList
    {
        public int TotalResults { get; set; }
        public List<FormResponse> FormsList { get; set; }
    }
}
