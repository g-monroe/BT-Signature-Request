using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SignatureRequestsContext.DataAccessHandlers
{
    public class SignatureRequestsContext : DbContext
    {
        public SignatureRequestsContext() : base()
        {

        }
        public SignatureRequestsContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
