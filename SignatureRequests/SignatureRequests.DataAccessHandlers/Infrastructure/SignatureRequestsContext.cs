using Microsoft.EntityFrameworkCore;
using SignatureRequests.Core.Entities;
using System.Linq;
using System.Data.Entity;

namespace SignatureRequests.DataAccessHandlers.Infrastructure
{
    public class SignatureRequestsContext : System.Data.Entity.DbContext
    {
        public SignatureRequestsContext() : base()
        {

        }
        //public SignatureRequestsContext(DbContextOptions options) : base(options)
        //{

        //}
        public System.Data.Entity.DbSet<UserEntity> Users { get; set; }
        public System.Data.Entity.DbSet<FormEntity> Forms { get; set; }
        public System.Data.Entity.DbSet<SignatureEntity> Signatures { get; set; }
        public System.Data.Entity.DbSet<RequestEntity> Requests { get; set; }
        public System.Data.Entity.DbSet<BoxEntity> Boxes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<RequestEntity>()
            .HasRequired<UserEntity>(b => b.Signer)
            .WithMany()
            .WillCascadeOnDelete(true);

            modelBuilder.Entity<RequestEntity>()
            .HasRequired<UserEntity>(b => b.Requestor)
            .WithMany()
            .WillCascadeOnDelete(true);

            modelBuilder.Entity<BoxEntity>()
            .HasOptional<SignatureEntity>(b => b.Signature)
            .WithMany().WillCascadeOnDelete(false);

        }
    }
}
