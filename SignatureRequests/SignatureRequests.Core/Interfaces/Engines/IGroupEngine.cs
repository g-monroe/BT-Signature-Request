﻿using SignatureRequests.Core.Entities;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.Engines
{
    public interface IGroupEngine
    {
        GroupResponse GroupToListItem(GroupEntity group);
    }
}