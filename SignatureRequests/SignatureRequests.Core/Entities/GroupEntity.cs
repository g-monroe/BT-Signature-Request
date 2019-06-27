using BTSuggestions.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class GroupEntity: BaseEntity
    {
        [Required]
        public virtual RequestEntity Request { get; set; }

        public int RequestId { get; set; }

        public virtual FormEntity FormEntity { get; set; }

        public int FormId { get; set; }

        
    }
}
