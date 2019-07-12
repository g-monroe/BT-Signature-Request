using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class GroupRequest
    {
        public int Id { get; set; }
        public FormRequest Form { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int FormId { get; set; }
    }
}
