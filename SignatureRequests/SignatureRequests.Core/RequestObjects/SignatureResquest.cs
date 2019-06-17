using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignatureRequests.Core.RequestObjects
{
    public class SignatureRequest
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public string CertificatePath { get; set; }
        public string CertificatePassword { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string ContactInfo { get; set; }
        public Boolean IsInitial { get; set; }
        public UserEntity User { get; set; }
        public int UserId { get; set; }
        public DateTime ExpirationDate { get; set; }

    }
}