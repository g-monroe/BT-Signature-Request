using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class FormRequest
    {
        public int Id { get; set; }
        public string FilePath { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

        public virtual UserEntity User { get; set; }

        public int UserId { get; set; }
    }
}
