using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignatureRequests.Models
{
    public class SignatureJSON
    {
        public string ImagePath { get; set; }
        public string CertificatePath { get; set; }
        public string CertificatePassword { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string ContactInfo { get; set; }
        public Boolean isInitial { get; set; }
        public virtual UserJSON User { get; set; }
        public int UserId { get; set; }
        public DateTime ExpirationDate { get; set; }

    }
}