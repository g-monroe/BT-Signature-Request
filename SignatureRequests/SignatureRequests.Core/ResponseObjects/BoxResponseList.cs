using System;
using System.Collections.Generic;
using System.Text;

namespace SignatureRequests.Core.ResponseObjects
{
    public class BoxResponseList
    {
        public int TotalResults { get; set; }
        public List<BoxResponse> BoxesList { get; set; }
    }
}
