﻿using BTSuggestions.Core.Entities;
using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers.ResponseObjects
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public SignatureEntity Signature { get; set; }
        public int? SignatureId { get; set; }
        public SignatureEntity Initial { get; set; }
        public int? InitialId { get; set; }
    }
}