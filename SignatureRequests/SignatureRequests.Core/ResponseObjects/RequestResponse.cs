﻿using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class RequestResponse
    {
        public int Id { get; set; }
        public virtual UserEntity Signer { get; set; }
        public int SignerId { get; set; }
        public virtual UserEntity Requestor { get; set; }
        public int RequestorId { get; set; }
        public virtual FormEntity Form { get; set; }
        public int FormId { get; set; }
        public string Status { get; set; }
        public DateTime SentDate { get; set; }
    }
}