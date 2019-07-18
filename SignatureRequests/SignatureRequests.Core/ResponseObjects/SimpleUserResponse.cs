using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class SimpleUserResponse
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int? SignatureId { get; set; }
        public int? InitialId { get; set; }
    }
}
