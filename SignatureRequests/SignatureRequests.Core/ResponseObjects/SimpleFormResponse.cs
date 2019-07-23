using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class SimpleFormResponse
    {
        public int Id { get; set; }
        public string FilePath { get; set; }
        public int NumPages { get; set; }
    }
}
