using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class GroupResponseList
    {
        public int TotalResults { get; set; }
        public List<GroupResponse> GorupsList { get; set; }
    }
}
