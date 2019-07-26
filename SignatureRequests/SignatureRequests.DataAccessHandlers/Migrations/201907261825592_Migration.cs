namespace SignatureRequests.DataAccessHandlers.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BoxEntities", "RequestId", "dbo.RequestEntities");
            AddColumn("dbo.BoxEntities", "RequestEntity_Id", c => c.Int());
            CreateIndex("dbo.BoxEntities", "RequestEntity_Id");
            AddForeignKey("dbo.BoxEntities", "RequestId", "dbo.RequestEntities", "Id", cascadeDelete: true);
            AddForeignKey("dbo.BoxEntities", "RequestEntity_Id", "dbo.RequestEntities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BoxEntities", "RequestEntity_Id", "dbo.RequestEntities");
            DropForeignKey("dbo.BoxEntities", "RequestId", "dbo.RequestEntities");
            DropIndex("dbo.BoxEntities", new[] { "RequestEntity_Id" });
            DropColumn("dbo.BoxEntities", "RequestEntity_Id");
            AddForeignKey("dbo.BoxEntities", "RequestId", "dbo.RequestEntities", "Id");
        }
    }
}
