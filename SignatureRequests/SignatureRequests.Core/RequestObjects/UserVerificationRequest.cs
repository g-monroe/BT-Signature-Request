using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class UserVerificationRequest
    {
        public string name { get; set; }
        public string password { get; set; }
    }
}
