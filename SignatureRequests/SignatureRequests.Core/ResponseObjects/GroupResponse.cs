﻿using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.ResponseObjects
{
    public class GroupResponse
    {
        public int Id { get; set; }
        public FormResponse Form { get; set; }
        public int FormId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public RequestResponseList RequestEntities { get; set; }
    }
}
