using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class ModelBoxResponse
    {
        public int Id { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public string Type { get; set; }
        public string SignerType { get; set; }
        public string SignedStatus { get; set; }
        public int? RequestId { get; set; }
        public int? SignatureId { get; set; }
        public int? FormId { get; set; }
        public int PageNumber { get; set; }
        public bool IsModel { get; set; }
        public string Text { get; set; }
        public DateTime? Date { get; set; }
        public int FormHeight { get; set; }
        public int FormWidth { get; set; }
    }
}
