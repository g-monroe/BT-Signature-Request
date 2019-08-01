using BTSuggestions.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class RequestEntity: BaseEntity
    {
        [Required]
        public virtual UserEntity Signer { get; set; }

        public int SignerId { get; set; }

        [Required]
        public virtual GroupEntity Group { get; set; }

        public int GroupId { get; set; }
        
        [Required]
        public virtual UserEntity Requestor { get; set; }

        public int RequestorId { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public DateTime SentDate { get; set; }
        public virtual ICollection<BoxEntity> BoxEntities { get; set; }

    }
}
