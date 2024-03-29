﻿using Microsoft.EntityFrameworkCore;
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
        public System.Data.Entity.DbSet<UserEntity> Users { get; set; }
        public System.Data.Entity.DbSet<FormEntity> Forms { get; set; }
        public System.Data.Entity.DbSet<SignatureEntity> Signatures { get; set; }
        public System.Data.Entity.DbSet<RequestEntity> Requests { get; set; }
        public System.Data.Entity.DbSet<BoxEntity> Boxes { get; set; }
        public System.Data.Entity.DbSet<GroupEntity> Groups { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<RequestEntity>()
            .HasRequired<UserEntity>(b => b.Signer)
            .WithMany()
            .WillCascadeOnDelete(false);

            modelBuilder.Entity<RequestEntity>()
            .HasRequired<UserEntity>(b => b.Requestor)
            .WithMany()
            .WillCascadeOnDelete(false);

            modelBuilder.Entity<BoxEntity>()
            .HasOptional<SignatureEntity>(b => b.Signature)
            .WithMany().WillCascadeOnDelete(false);

            modelBuilder.Entity<BoxEntity>()
            .HasOptional<RequestEntity>(b => b.Request)
            .WithMany().WillCascadeOnDelete(true);

        }
    }
}
