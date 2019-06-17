using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Enums
{
    public class InitializeCertifcation
    {
        public enum Error
        {
            Initialize = 1,
            Seralize = 2,
            Seed = 3,
            Finialze = 4,
            Success = 5
        }
    }
}
