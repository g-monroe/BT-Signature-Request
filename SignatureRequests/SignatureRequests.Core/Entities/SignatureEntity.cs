﻿using BTSuggestions.Core.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Entities
{
    public class SignatureEntity: BaseEntity
    {
        [Required]
        public string ImagePath { get; set; }

        [Required] 
        public string CertificatePath { get; set; }

        [MaxLength(255), Required]
        public string CertificatePassword { get; set; }

        [MaxLength(255)]
        public string Location { get; set; }

        [MaxLength(400)]
        public string Reason { get; set; }

        [MaxLength(400)]
        public string ContactInfo { get; set; }

        [Required]
        public Boolean isInitial { get; set; }

        [Required]
        public virtual UserEntity User { get; set; }

        public int UserId { get; set; }

        public DateTime ExpirationDate { get; set; }

    }
}
