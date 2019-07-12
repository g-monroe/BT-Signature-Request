using BTSuggestions.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class FormEntity: BaseEntity
    {
        [Required]
        public string FilePath { get; set; }

        [MaxLength(255), Required]
        public string Title { get; set; }

        [MaxLength(400)]
        public string Description { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public virtual UserEntity User { get; set; }

        public int UserId { get; set; }
        
        public int NumPages { get; set; }

        public virtual ICollection<GroupEntity> GroupEntities { get; set; }
    }
}
