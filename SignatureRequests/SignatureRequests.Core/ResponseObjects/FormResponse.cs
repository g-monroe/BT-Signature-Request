using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class FormResponse
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual UserResponse User { get; set; }
        public int UserId { get; set; }
        public int NumPages { get; set; }
        public GroupResponseList GroupEntities { get; set; }
    }
}
