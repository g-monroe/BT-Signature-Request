using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignatureRequests.Managers.ResponseObjects
{
    public class SignatureResponse
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public string CertificatePath { get; set; }
        public string CertificatePassword { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string ContactInfo { get; set; }
        public Boolean isInitial { get; set; }
        public virtual UserEntity User { get; set; }
        public int UserId { get; set; }
        public DateTime ExpirationDate { get; set; }

    }
}