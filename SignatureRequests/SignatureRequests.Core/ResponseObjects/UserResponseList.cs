using System;
using System.Collections.Generic;
using System.Text;

namespace SignatureRequests.Core.ResponseObjects
{
    public class UserResponseList
    {
        public int TotalResults { get; set; }
        public List<UserResponse> UsersList { get; set; }
    }
}
