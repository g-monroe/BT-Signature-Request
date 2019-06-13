using System;
using System.Collections.Generic;
using System.Text;

namespace SignatureRequests.Managers.ResponseObjects
{
    public class SignatureResponseList
    {
        public int TotalResults { get; set; }
        public List<SignatureResponse> SignaturesList { get; set; }
    }
}
