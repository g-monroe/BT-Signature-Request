using SignatureRequests.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Models
{
    public class FormJSON
    {
        public string FilePath { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

        public virtual UserJSON User { get; set; }

        public int UserId { get; set; }
    }
}