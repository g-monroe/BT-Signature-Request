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
    public class GroupEntity: BaseEntity
    {
        [Required]
        public virtual FormEntity Form { get; set; }
        public int FormId { get; set; }
        public virtual ICollection<RequestEntity> RequestEntities { get; set; }
    }
}
