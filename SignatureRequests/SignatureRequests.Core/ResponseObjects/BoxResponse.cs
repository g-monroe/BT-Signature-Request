using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class BoxResponse
    {
        public int Id { get; set; }
        public int? Width { get; set; }
        public int? Length { get; set; }
        public int? X { get; set; }
        public int? Y { get; set; }
        public string Type { get; set; }
        public string SignerType { get; set; }
        public string SignedStatus { get; set; }
        public int RequestId { get; set; }
        public int? SignatureId { get; set; }
    }
}
