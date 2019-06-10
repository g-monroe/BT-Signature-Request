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
        //public DbSet<PainPointEntity> PainPoints { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<PainPointTypeEntity>()
            //    .HasOne<PainPointEntity>(sc => sc.PainPoint)
            //    .WithMany(s => s.TypeEntities)
            //    .HasForeignKey(sa => sa.PainPointId);

            //modelBuilder.Entity<PainPointTypeEntity>()
            //    .HasOne<TypeEntity>(sa => sa.Type)
            //    .WithMany(a => a.TypeEntities)
            //    .HasForeignKey(sa => sa.TypeId);
            //foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            //{
            //    relationship.DeleteBehavior = DeleteBehavior.Restrict;
            //}
        }
    }
}
