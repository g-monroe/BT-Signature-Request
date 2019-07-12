using System;
using System.Collections.Generic;
using System.Text;

namespace SignatureRequests.Core.ResponseObjects
{
    public class BoxToCompleteListResponse
    {
        public int TotalResults { get; set; }
        public List<BoxToCompleteResponse> BoxesList { get; set; }
    }
}
