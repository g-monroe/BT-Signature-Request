using BTSuggestions.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class UserEntity: BaseEntity
    {
        [MaxLength(255), Required]
        public string Role { get; set; }
        
        [MaxLength(255), Required]
        public string Name { get; set; }

        [MaxLength(255), Required]
        public string Email { get; set; }

        [MaxLength(255), Required]
        public string Password { get; set; }

        [Required]
        public virtual SignatureEntity Signature { get; set; }

        public int? SignatureId { get; set; }

        [Required]
        public virtual SignatureEntity Initial { get; set; }

        public int? InitialId { get; set; }
    }
}
