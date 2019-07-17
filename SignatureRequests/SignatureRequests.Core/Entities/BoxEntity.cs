using BTSuggestions.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace SignatureRequests.Core.Entities
{
    public class BoxEntity: BaseEntity
    {
        [Required]
        public int Width { get; set; }

        [Required]
        public int Height { get; set; }

        [Required]
        public int X { get; set; }

        [Required]
        public int Y { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string SignerType { get; set; }

        [Required]
        public string SignedStatus { get; set; }

        public virtual RequestEntity Request { get; set; }

        public int? RequestId { get; set; }

        public virtual SignatureEntity Signature { get; set; }

        public int? SignatureId { get; set; }

        [Required]
        public virtual FormEntity Form { get; set; }

        public int FormId { get; set; }

        public int PageNumber { get; set; }

        public bool IsModel { get; set; }

        public string Text { get; set; }

        public DateTime? Date { get; set; }

        
    }
}
