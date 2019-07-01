using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class UserVerificationRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
