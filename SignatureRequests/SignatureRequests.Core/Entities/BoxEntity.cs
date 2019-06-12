using BTSuggestions.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class BoxEntity: BaseEntity
    {
        [Required]
        public int? Width { get; set; }

        [Required]
        public int? Length { get; set; }

        [Required]
        public int? X { get; set; }

        [Required]
        public int? Y { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string SignerType { get; set; }

        [Required]
        public string SignedStatus { get; set; }

        [Required]
        public virtual RequestEntity Request { get; set; }

        public int RequestId { get; set; }

        public virtual SignatureEntity Signature { get; set; }

        public int? SignatureId { get; set; }

        
    }
}
