using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.RequestObjects
{
    public class SignedBoxRequest
    {
        public int Id { get; set; }
        public string SignedStatus { get; set; }
        public int? SignatureId { get; set; }
        public bool IsModel { get; set; }
        public string Text { get; set; }
        public DateTime? Date { get; set; }

    }
}
