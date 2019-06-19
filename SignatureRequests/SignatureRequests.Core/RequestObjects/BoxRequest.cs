﻿using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignatureRequests.Core.RequestObjects
{
    public class BoxRequest
    {
        public int Id { get; set; }
        public int? Width { get; set; }
        public int? Length { get; set; }
        public int? X { get; set; }
        public int? Y { get; set; }
        public string Type { get; set; }
        public string SignerType { get; set; }
        public string SignedStatus { get; set; }
        public RequestEntity Request { get; set; }
        public int RequestId { get; set; }
        public SignatureEntity Signature { get; set; }
        public int? SignatureId { get; set; }

    }
}